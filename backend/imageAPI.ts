import ImageKit from "imagekit";
import {ImageDTO} from "@/backend/types";

export const ImageAPI = new ImageKit({
	publicKey : process.env.IMAGE_KIT_PUBLIC_KEY!,
	privateKey : process.env.IMAGE_KIT_PRIVATE_KEY!,
	urlEndpoint : process.env.IMAGE_KIT_URL!
});

export const uploadImage = async (image: ImageDTO): Promise<ImageDTO | null> => {
	if(!image) return null;
	const uploaded = await ImageAPI.upload({
		file : image.src, //required
		fileName : `${image.id}.${image.extension}`, //required
	});
	return {id: uploaded.fileId, src:uploaded.url, extension: image.extension }
}
export const deleteImage = async (id: string) => {
	if(!id) return;
	return ImageAPI.deleteFile(id)
}

export const deleteImages = (images: ImageDTO[]) => {
	if(!images?.length) return;
	return Promise.all(images.map(({id}) => id && deleteImage(id)))

}

export const uploadImages = (images: ImageDTO[]) => {
	if(!images?.length) return;
	return Promise.all(images.map(uploadImage))
}
