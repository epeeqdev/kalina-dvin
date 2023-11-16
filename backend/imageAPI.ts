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

export const handleImages = async (oldImages: ImageDTO[] | null, newImages: ImageDTO[] | null) => {
	const newImagesIds = newImages?.filter(Boolean)?.reduce((acc, image) => ({...acc, [image.id]:image.id }),{}) ?? {};
	if(!newImages || !newImagesIds || !Object.keys(newImagesIds)?.length){
		try {
			if(oldImages?.length){
				console.log('Deleting images', oldImages);
				await deleteImages(oldImages);
			}
		}catch (e){
			console.log('Remove all old images error', e)
		}
		return [];
	}
	if(oldImages?.length){
		const imagesToRemove = oldImages.filter(item => !newImagesIds[item.id as keyof typeof newImagesIds])
		try {
			if(imagesToRemove.length){
				console.log('Deleting images', imagesToRemove);
				await deleteImages(imagesToRemove);
			}
		}catch (e){
			console.log('Remove old images error', e)
		}
	}
	const imagesToAdd = newImages?.reduce((acc:(ImageDTO & {idx: number})[],item, idx) => {
		if(!item.src.includes(process.env.IMAGE_KIT_URL!)){
			acc.push({...item, idx})
		}
		return acc
	},[])
	if(imagesToAdd?.length){
		console.log('Uploading images', imagesToAdd);
		const uploadedImages = await uploadImages(imagesToAdd);
		console.log('Uploaded images', uploadedImages);
		if(uploadedImages?.length){
			imagesToAdd.forEach(({idx}, index) => {
				newImages.splice(idx, 1, uploadedImages[index]!)
			})
		}
		return [...newImages]
	}
	return [...newImages];
}

export const handleImage = async (oldImage: ImageDTO | null, newImage: ImageDTO | null) => {
	if (!newImage) {
		if (oldImage) {
			try{
				console.log('Deleting old image', oldImage);
				await deleteImage(oldImage.id);
			}catch (e){
				console.log('Deleting old image error', e)
			}

		}
		return null;
	}

	if (oldImage && oldImage.id !== newImage.id) {
		try{
			console.log('Deleting old image', oldImage);
			await deleteImage(oldImage.id);
		}catch (e){
			console.log('Deleting old image error', e)
		}
	}

	if (!newImage.src.includes(process.env.IMAGE_KIT_URL!)) {
		console.log('Uploading image', newImage);
		const uploadedImage = await uploadImage(newImage);
		console.log('Uploaded image', uploadedImage);
		return uploadedImage;
	}

	return newImage;
};
