"use client"

import {ChangeEvent} from "react";
import {convertFileToBase64} from "@/app/admin/main/products/helpers/convertImage";
import {Image} from "@/app/admin/types";

interface Props {
    onChange: (images: Image[]) => void;

}

export default function ImageUploader({onChange}:Props){

    const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files) {
            const imgList = Object.values(e.target.files);
            const images = await Promise.all<Promise<Image>>(imgList.map(item => convertFileToBase64(item)))
            onChange(images);
        }
    }

    return (
        <div className="my-5 text-dark-grey flex">
            <label> Select image : <input type="file" multiple onChange={onImageChange} accept="image/*"/>
            </label>
        </div>
    )
}
