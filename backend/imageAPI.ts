import ImageKit from "imagekit";
import {ImageDTO} from "@/backend/types";

export const ImageAPI = new ImageKit({
	publicKey : process.env.IMAGE_KIT_PUBLIC_KEY!,
	privateKey : process.env.IMAGE_KIT_PRIVATE_KEY!,
	urlEndpoint : process.env.IMAGE_KIT_URL!
});

export const uploadImage = async (image: ImageDTO): Promise<ImageDTO | undefined> => {
	if(!image) return;
	const uploaded = await ImageAPI.upload({
		file : image.src, //required
		fileName : `${image.id}.${image.extension}`, //required
	});
	return {id: uploaded.fileId, src:uploaded.url, extension: image.extension }
}
export const deleteImage = (id: string) => {
	if(!id) return;
	try {
		return ImageAPI.deleteFile(id)
	}catch(e) {
		return null
	}

}

export const deleteImages = (images: ImageDTO[]) => {
	if(!images?.length) return;
	console.log(images)
	try{
		return Promise.all(images.map(({id}) => id && deleteImage(id)))
	}catch(e){
		return []
	}

}

export const uploadImages = (images: ImageDTO[]) => {
	if(!images?.length) return;
	return Promise.all(images.map(uploadImage))
}
