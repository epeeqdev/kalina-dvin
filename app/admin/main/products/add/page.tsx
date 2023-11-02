"use client"
import {Input} from "@/components/controls/input";
import {Button} from "@/components/controls/button";
import {addProduct} from "@/app/admin/main/products/helpers/addProduct";
import {ImageType, Product, ProductAttribute} from "@/app/admin/main/products/types";
import {useEffect, useState} from "react";
import AttrForm from "@/app/admin/main/products/add/components/attrForm";
import MultiSelectInput from "@/app/admin/main/products/add/components/multiSelectInput";
import {useAddProductForm} from "@/app/admin/main/products/add/form";
import ImageUploader from "@/app/admin/main/products/add/components/ImageUploader";
import {Image} from "@/app/admin/types";

const categories = [
    {value: 'clean', label: 'Clean'},
    {value: 'baby', label: 'Baby'},
    {value: 'care', label: 'Care'},
    {value: 'fabric', label: 'Fabric'},
    {value: 'man', label: 'Man'},
    {value: 'woman', label: 'Woman'},
    {value: 'shampoo', label: 'Shampoo'},
    {value: 'shaving', label: 'Shaving'},
];


export default function Add() {
    const [images, setImages] = useState<Image[]>([])
    const [inpVisible, setInpVisible] = useState<boolean>(false)
    const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
    const {errors, register, control, handleSubmit} = useAddProductForm();

    const removeItem = (id: string) => {
        const removedItem = attributes.filter(item => item.id !== id)
        setAttributes(removedItem)
    }
    const removeImage = (id: string) => {
        const filteredImages = images.filter((item) => item.id !== id)
        setImages(filteredImages)
    }
    const onSubmit = async (data: Product) => {
        console.log('submit', data)
        await addProduct({...data, images})
    }
    console.log('errors', errors)


    const [value, setValue] = useState(0)

    useEffect(() => {
        console.log('value 1 1 11 1 11', value)

    }, [value, setValue])


    return (
        <div className="flex w-full items-start justify-between">
            <div className='flex-1'>
                <h1 className="text-xl">Add Product</h1>
                <form onSubmit={(e) => {
                    handleSubmit(onSubmit)(e)
                }} className="mt-10">
                    <Input label="Title *"
                           placeholder='Type name'
                           {...register("title")}
                           className='w-full mt-2'
                           error={errors.title?.message}
                    />

                    <Input
                        label="description *"
                        placeholder='Description'
                        {...register("description", {required: true})}
                        className='w-full mt-2'
                        error={errors.description?.message}
                    />

                    <label className='text-[16px] mb-1 text-dark-grey'>Choose a Category : </label>
                    <MultiSelectInput control={control} name="categories" options={categories}/>
                    <div>
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
            <div className="ml-[100px] flex-1">
                <ImageUploader onChange={(items) => setImages(prev => [...prev, ...items])}/>
                <div className="grid grid-cols-4 gap-2 my-10">
                    {
                        images && images.map((item) => {
                            return (
                                <div key={item.id}>
                                    <button onClick={() => {
                                        removeImage(item.id)
                                    }} className="bg-red-600 text-white absolute z-2 w-[25px] h-[25px]">x
                                    </button>
                                    <img alt='product image' src={item.src}
                                         className="w-40 h-25 border-2 z-6 border-red-800"/>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="my-5 text-dark-grey">Attributes</div>
                <label htmlFor="Atributes" className="my-[20px]">
                    Add Attributes :
                    {
                        inpVisible
                            ? <AttrForm onAdd={(attr) => {
                                setAttributes(prev => [...prev, attr]);
                                setInpVisible(false);
                            }}/>
                            : <Button className="ml-5" onClick={() => setInpVisible(prev => !prev)}>Add
                                attributes</Button>
                    }
                </label>
                <div className="w-full">
                    {attributes.map(({id, name, value}) =>
                        <div className="my-5 text-dark-grey flex justify-between" key={id}>{`${name} : ${value}`}
                            <button onClick={() => {
                                removeItem(id)
                            }} className="bg-red-600 text-white w-[25px] h-[25px] ml-1">x
                            </button>
                        </div>)}
                </div>
            </div>
        </div>
    )
}
