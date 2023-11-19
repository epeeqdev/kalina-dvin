import React, {useCallback, useEffect, useState} from "react";
import {ImageDTO} from "@/backend/types";
import axios from "@/axios";


const FILE_IMAGE_UPLOAD_PATH = '/api/image';
const URL_IMAGE_UPLOAD_PATH = '/api/image/from-url';


export const useImageUploader = (onUploadComplete: ((uploaded: ImageDTO[] | ImageDTO) => void), multiple: boolean, defaultValue: ImageDTO[] = []) => {
    const [uploadedImages, setUploadedImages] = useState<ImageDTO[]>(defaultValue);
    const [loading, setLoading] = useState(false);
    const [loadingImagesIds, setLoadingImageId] = useState<string[]>([]);
    const [uploadingImagesLoadingCount, setUploadingImagesLoadingCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleUploadFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const files = event?.target?.files;
        if (!files || !files.length) return;
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append('images', file));
        const filesLength = Array.from(files).length;
        try {
            setLoading(true);
            setUploadingImagesLoadingCount(prev => prev + filesLength)
            const response = await axios.post<{ uploadedImages: ImageDTO[] }>(FILE_IMAGE_UPLOAD_PATH, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const newImages = response.data.uploadedImages;
            setUploadedImages(current => {
                const newImageList = [...current, ...newImages];
                onUploadComplete(multiple ? newImageList : newImages[0]);
                return newImageList;
            });
        } catch (error: any) {
            setError('Upload failed. Please try again.');
        }finally {
            setLoading(false)
            setUploadingImagesLoadingCount(prev => (prev - filesLength >-1 ? prev - filesLength: 0))
        }
    };

    const handleUploadFromURL = useCallback(async (imageUrl: string) => {
        try {
            setLoading(true);
            setUploadingImagesLoadingCount(prev => prev +1)
            const response = await axios.post<{ uploadedImage: ImageDTO }>(URL_IMAGE_UPLOAD_PATH, { image: imageUrl }, {
                headers: { 'Content-Type': 'application/json' },
            });
            const newImage = response.data.uploadedImage;
            setUploadedImages(current =>{
                const newImageList =  multiple ? [...current, newImage]: [newImage];
                onUploadComplete(multiple ? newImageList : newImageList[0]);
                return newImageList
            })
        } catch (error: any) {
            setError('Error uploading image URL. Please try again.');
        }finally {
            setLoading(false);
            setUploadingImagesLoadingCount(prev => prev > 0 ? prev - 1 : 0);
        }
    }, [onUploadComplete]);

    const removeImage = useCallback(async (imageId: string) => {
        try {
            setLoading(true)
            setLoadingImageId(prev => [...prev, imageId]);
            await axios.delete(`${FILE_IMAGE_UPLOAD_PATH}/${imageId}`);
            setUploadedImages(currentImages => {
                const filtered = currentImages.filter(image => image._id !== imageId)
                onUploadComplete(multiple ? filtered : null);
                return filtered;
            });
        } catch (error: any) {
            setError('Error removing the image. Please try again.');
        }finally {
            setLoading(false);
            setLoadingImageId(prev => prev.filter(id => id!==imageId));
        }
    }, []);

    useEffect(() => {
        if(!uploadedImages.length && defaultValue?.length){
            setUploadedImages(defaultValue);
        }
    }, [defaultValue]);

    return { uploadedImages, setUploadedImages, error, handleUploadFiles, uploadingImagesLoadingCount, loadingImagesIds, handleUploadFromURL, removeImage, loading };
};