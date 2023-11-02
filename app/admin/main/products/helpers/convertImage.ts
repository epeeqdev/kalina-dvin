import uniqid from "uniqid";
import {Image} from "@/app/admin/types";

export const convertFileToBase64 = (file: File): Promise<Image> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const extension = file?.type?.slice(file?.type?.indexOf('/')+1) || 'jpg'
        reader.onloadend = () => {
            const base64String = reader.result;
            resolve({src: base64String as string, id: uniqid(), extension});
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};
