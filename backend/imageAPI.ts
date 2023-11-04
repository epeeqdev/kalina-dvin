import ImageKit from "imagekit";
import {Image} from "@/app/admin/types";
import {UploadedImageData} from "@/backend/types";

export const ImageAPI = new ImageKit({
	publicKey : "public_qNyTa0LKzjJeUXnktJI8UMFsBTk=",
	privateKey : "private_Hq5KpxIYtEynlmk3KEFei9zDoYo=",
	urlEndpoint : "https://ik.imagekit.io/zofeq1cgs"
});

export const uploadImage = async (image: Image): Promise<Image> => {
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

export const deleteImages = (images: Image[]) => {
	if(!images?.length) return;
	return Promise.all(images.map(({id}) =>deleteImage(id)))
}

export const uploadImages = (images: Image[]) => {
	if(!images?.length) return;
	return Promise.all(images.map(uploadImage))
}
