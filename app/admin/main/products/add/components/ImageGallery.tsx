"use client"

import {ChangeEvent} from "react";
import {convertFileToBase64} from "@/app/admin/main/products/helpers/convertImage";
import {Image} from "@/app/admin/types";
import DeleteButton from "@/components/controls/delete-button/page";
import {Control, Controller} from "react-hook-form";
import {Product} from "@/app/admin/main/products/types";

interface Props {
   control: Control<Product>;
   name: string;
}
export default function ImageGallery({control, name}: Props) {

    return (
        <Controller render={({field}) =>  {
            const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
                if (e?.target?.files) {
                    const imgList = Object.values(e.target.files);
                    const images = await Promise.all<Promise<Image>>(imgList.map(item => convertFileToBase64(item)))
                    field.onChange([...(field.value ?? []), ...images]);
                }
            }

            const onRemove = (id:string) => {
                if(field.value){
                    field.onChange(field.value.filter(image => image.id !== id))
                }
            }
            return <div>
                <div className='grid grid-cols-4 gap-2 border-2 rounded p-2 min-h-[100px] lg:min-h-[200px]'>
                    {
                        field.value?.map((item: Image) => {
                            return (
                                <div key={item.id} className="relative pt-[100%]">
                                    <img alt='product image' src={item.src} className="absolute w-full h-full left-0 top-0 object-contain bg-[#dadada]"/>
                                    <DeleteButton remove={() => onRemove(item.id)} className={"absolute top-[3%] right-[3%]"}/>
                                </div>
                            )
                        })
                    }
                    <div className="text-dark-grey flex bg-[#dadada] hover:bg-[#cfc7c7] transition relative pt-[100%]">
                        <label className="w-full h-full cursor-pointer flex justify-center items-center text-[100px] absolute top-0 left-0">
                            <input className="hidden"
                                   type="file"
                                   multiple
                                   onChange={onImageChange}
                                   accept="image/*"
                            />
                            +
                        </label>
                    </div>
                </div>
            </div>}} name={name} control={control}/>
    )
}
