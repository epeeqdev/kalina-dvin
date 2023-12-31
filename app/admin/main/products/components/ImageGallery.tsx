"use client"

import {ChangeEvent} from "react";
import {convertFileToBase64} from "@/app/admin/main/products/helpers/convertImage";
import {Control, Controller} from "react-hook-form";
import clsx from "clsx";
import {ImageDTO} from "@/backend/types";
import DeleteButton from "@/app/admin/main/components/controls/delete-button";

interface Props {
    control: Control<any>;
    name: string;
    className?: string,
    imageClassName?: string
    multiple?: boolean
    imageHeightProportion?: number;
}

export default function ImageGallery({control, name, imageHeightProportion = 100, className,imageClassName, multiple = false}: Props) {
    const proportionalBlockStyle = {
        paddingTop: `${imageHeightProportion}%`
    }
    return (
        <Controller render={({field}) => {
            const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
                if (e?.target?.files) {
                    const imgList = Object.values(e.target.files);
                    const images = await Promise.all<Promise<ImageDTO[]>>(imgList.map(item => convertFileToBase64(item)))
                    field.onChange(multiple ? [...(field.value ?? []), ...images] : images[0]);
                }
            }

            const onRemove = (id: string) => {
                if (field.value) {
                    field.onChange(multiple ? field.value.filter((image:ImageDTO) => image.id !== id): null)
                }
            }
            return <div
                    className={clsx('border-2 rounded',{
                        'grid grid-cols-4 gap-2 p-2 min-h-[100px] lg:min-h-[200px]': multiple,
                        'min-h-[100px] w-full min-w-[150px] flex items-center':!multiple
                    }, className)}>
                    {
                        multiple ? field.value?.map((item: ImageDTO) => {
                            return (
                                <div key={item?.id} className={`relative w-full`} style={proportionalBlockStyle}>
                                    <img alt='product image' src={item?.src} className={clsx("absolute w-full h-full left-0 top-0 object-contain bg-[#dadada]",imageClassName)}/>
                                    <DeleteButton
                                        remove={() => onRemove(item.id)}
                                        className={"absolute top-[3%] right-[3%]"}
                                    />
                                </div>
                            )
                        }): !!field.value &&
                            <div key={field.value.id} className={`relative w-full`} style={proportionalBlockStyle}>
                            <img alt='product image' src={field?.value?.src} className={clsx("absolute h-full left-0 top-0 object-contain bg-[#dadada] w-full", imageClassName)}/>
                            <DeleteButton
                                remove={() => onRemove(field.value.id)}
                                className={"absolute top-[3%] right-[3%]"}
                            />
                        </div>
                    }
                    {
                        (multiple || !field.value) &&
                        <div className={clsx(`text-dark-grey flex bg-[#dadada] hover:bg-[#cfc7c7] transition relative w-full`)} style={proportionalBlockStyle}>
                        <label
                            className="w-full h-full cursor-pointer flex justify-center items-center text-[100px] absolute top-0 left-0">
                            <input className="hidden"
                                   type="file"
                                   multiple
                                   onChange={onImageChange}
                                   accept="image/*"
                            />
                            +
                        </label>
                    </div>
                    }
                </div>
        }} name={name} control={control}/>
    )
}
