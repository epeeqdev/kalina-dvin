'use client'
import React, {useState} from 'react';
import {useImageUploader} from "@/app/admin/main/components/controls/image-uploader/use-image-uploader";
import clsx from "clsx";
import IconComponent from "@/app/admin/main/components/icon";
import {ImageDTO} from "@/backend/types";
import {ProportionBlock} from "@/app/admin/main/components/controls/image-uploader/proportion-block";
import {ImageVariantButton} from "@/app/admin/main/components/controls/image-uploader/image-variant-button";
import {UrlUploadModal} from "@/app/admin/main/components/controls/image-uploader/url-upload-modal";
import {Draggable} from "@/app/admin/main/drag-and-drop/draggable";
import {Droppable} from "@/app/admin/main/drag-and-drop/droppable";
import {DroppableArgs} from "@/app/admin/main/drag-and-drop/types";
import {getReorderedItems} from "@/app/admin/main/drag-and-drop/utils/getReorderedItems";
import Alert from "@/app/admin/main/products/helpers/alert";

export interface ImageUploaderProps {
    multiple?: boolean;
    onUploadComplete: (ids: ImageDTO[] | ImageDTO) => void;
    imageHeightProportion?: number;
    defaultUploadedImages?: ImageDTO[];
    className?: string;
    imageFit?: 'contain' | 'cover';
    label?: string
    error?: string | any
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({className,label,imageFit = 'contain', multiple = false, defaultUploadedImages, onUploadComplete, imageHeightProportion = 100, error}) => {
    const [isUploadingFromUrl, setUploadingFromUrl] = useState(false);
    const {
        handleUploadFiles,
        setUploadedImages,
        handleUploadFromURL,
        uploadingImagesLoadingCount,
        loadingImagesIds,
        uploadedImages,
        removeImage,
        loading
    } = useImageUploader(onUploadComplete, multiple, defaultUploadedImages);

    const proportionalBlockStyle = {
        paddingTop: `${imageHeightProportion}%`
    }
    const handleDrop = (args:DroppableArgs) => {
        const reordered = getReorderedItems(uploadedImages, args);
        setUploadedImages(getReorderedItems(uploadedImages, args));
        onUploadComplete(reordered);
    };

    return <div className="mb-5">
        <div className={
            clsx('w-full grid gap-4', {
                'grid-cols-1': !multiple,
                'grid-cols-2 md:grid-cols-5 ': multiple
            }, className, {"border-2 border-red-600" : error})}>
            {label && <label>{label}</label>}
            <ProportionBlock proportionalBlockStyle={proportionalBlockStyle}
                             isLoading={loading && !multiple}>
                {((multiple) || (!multiple && !uploadedImages.length)) ?
                    <div className='flex flex-col justify-stretch h-full'>
                        <ImageVariantButton onClick={() => setUploadingFromUrl(true)}>
                            <IconComponent name='link'/>
                            <span>Ссылка</span>
                        </ImageVariantButton>
                        <ImageVariantButton as='label'>
                            <input
                                type="file"
                                value={[]}
                                multiple={multiple}
                                onChange={handleUploadFiles}
                                accept="image/*"
                                className="hidden"
                            />
                            <IconComponent name='image'/>
                            <span>Файл</span>
                        </ImageVariantButton>
                    </div> : <ImageBlock
                        imageFit={imageFit}
                        isLoading={loadingImagesIds.includes(uploadedImages[0].id)}
                        proportionalBlockStyle={proportionalBlockStyle} image={uploadedImages[0]} onRemove={removeImage}/>}
            </ProportionBlock>
            {multiple && uploadedImages.map((image, index) => (
                <Droppable key={image._id} id={image._id} onDrop={handleDrop}>
                    <Draggable id={image._id}>
                        <ImageBlock
                            imageFit={imageFit}
                            isLoading={loadingImagesIds.includes(image._id)}
                            proportionalBlockStyle={proportionalBlockStyle}
                            image={image}
                            onRemove={removeImage}/>
                    </Draggable>
                </Droppable>

            ))}
            {multiple && new Array(uploadingImagesLoadingCount).fill(0).map((_, index) => <ProportionBlock key={index}
                                                                                                           proportionalBlockStyle={proportionalBlockStyle}
                                                                                                           isLoading/>)}
            <UrlUploadModal
                onSubmit={handleUploadFromURL}
                isOpen={isUploadingFromUrl}
                onClose={() => setUploadingFromUrl(false)}
            />
        </div>
        {!!error && <span className="text-sm text-red-600">{error}</span>}
    </div>
};

interface ImageBlockProps {
    isLoading: boolean;
    proportionalBlockStyle: {
        paddingTop: string;
    },
    image: ImageDTO;
    onRemove: (id: string) => void;
    imageFit: ImageUploaderProps['imageFit']
}

const ImageBlock = ({isLoading, image, proportionalBlockStyle,imageFit, onRemove}: ImageBlockProps) => {

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const closeModal = () => {
        setDeleteModalOpen(false)
    }

    return (
        <>
        <ProportionBlock isLoading={isLoading} draggable proportionalBlockStyle={proportionalBlockStyle}>
            <div className={clsx('relative w-full h-full')}>
                <img src={image.src} alt='uploaded image' className={`w-full h-full object-${imageFit}`}/>
                <div className='absolute top-0 right-0 p-1 cursor-pointer transition hover:bg-secondary bg-secondary-lighter'
                     onClick={() => setDeleteModalOpen(true)}>
                    <IconComponent name='deleteBin' color='white'/>
                </div>
            </div>
        </ProportionBlock>
                <Alert isOpen={deleteModalOpen} onAccept={() => {
                    onRemove(image._id)
                    closeModal()
                }} onClose={closeModal} onCancel={closeModal} title="Удалить Картинку ?" >
                    <p className="text-2xl font-bold my-10">Вы уверены, что хотите удалить эту картинку?</p>
                    <p className="text-gray-700 text-[16px]">После удаления не возможно восстановить данную картинку!</p>
                </Alert>
        </>
    );
}