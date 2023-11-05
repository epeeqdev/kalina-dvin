import ImageKit from "imagekit";
import {ImageDTO, UploadedImageData} from "@/backend/types";

export const ImageAPI = new ImageKit({
	publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
	privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
	urlEndpoint : process.env.IMAGE_KIT_URL
});

export const uploadImage = async (image: ImageDTO): Promise<ImageDTO> => {
	if(!image) return;
	const uploaded = await ImageAPI.upload({
		file : image.src, //required
		fileName : `${image.id}.${image.extension}`, //required
	}) as UploadedImageData;
	return {id: uploaded.fileId, src:uploaded.url, extension: image.extension }
}
export const deleteImage = (id: string) => {
	if(!id) return;
	return ImageAPI.deleteFile(id)
}

export const deleteImages = (images: ImageDTO[]) => {
	if(!images?.length) return;
	return Promise.all(images.map(({id}) =>deleteImage(id)))
}

export const uploadImages = (images: ImageDTO[]) => {
	if(!images?.length) return;
	return Promise.all(images.map(uploadImage))
}
