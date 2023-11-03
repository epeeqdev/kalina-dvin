"use client"
import {Input} from "@/components/controls/input";
import {Button} from "@/components/controls/button";
import {addProduct} from "@/app/admin/main/products/helpers/addProduct";
import {CategoriesItem, Product, ProductAttribute} from "@/app/admin/main/products/types";
import {useEffect, useState} from "react";
import AttrForm from "@/app/admin/main/products/add/components/attrForm";
import MultiSelectInput from "@/components/controls/autocomplete-input";
import {ProductFormFields, useAddProductForm} from "@/app/admin/main/products/add/form";
import ImageGallery from "@/app/admin/main/products/add/components/ImageGallery";
import {Image} from "@/app/admin/types";
import {TextArea} from "../../../../../components/controls/text-area";
import DeleteButton from "@/components/controls/delete-button/page";
import LoadingSpinner from "../../../../../components/controls/loading-spinner";
import {useRouter} from "next/navigation";
import axios from "@/axios";


export default function Add() {

    const router = useRouter()
    const [images, setImages] = useState<Image[]>([])
    const [categories , setCategories] = useState([])
    const [brands , setBrands] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState(0)
    const [inpVisible, setInpVisible] = useState<boolean>(false)
    const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
    const {
        errors,
        control,
        register,
        handleSubmit,
        getValues
    } = useAddProductForm();



    const getCategories = () => {
        axios.get(`/api/categories`).then((resp) => {
            setCategories( resp.data.map((item : CategoriesItem) => {
                return {value : item._id , label: item.name.ru}
            }))
        })
    }
    const getBrands = () => {
        axios.get(`/api/brands`).then((resp) => {
            setBrands( resp.data.map((item : CategoriesItem) => {
                return {value : item._id , label: item.name.ru}
            }))
        })
    }
    const removeItem = (id: string) => {
        setAttributes(prev => prev.filter((item) => item.id !== id))
    }

    const onSubmit = async (data: ProductFormFields) => {
        setLoading(true)
        await addProduct({...data, images,categories:getValues().categories.map(item => item.value), attributes: []}).then(() => {
            setLoading(false)
            router.push('/admin/main/products')
        }).catch(() => {
            setLoading(false)
        })
    }


    useEffect(() => {
        getCategories()
        getBrands()
    },[])

    const submit = () => {
        handleSubmit((data) => {
        console.log("data" , data)
            onSubmit(data)
        })()
    }


    return (
        <div className="w-full">
            {isLoading && <LoadingSpinner/>}
            <h1 className="text-xl mb-5">Add Product</h1>
            <div className="mb-5">
                <ImageGallery uploadedImages={images} onChange={setImages}/>
            </div>
            <div className="mb-5">
                <Input label="Title"
                       placeholder='Type name'
                       {...register("title")}
                       className='w-full mt-1'
                       error={errors.title?.message}
                       required={true}
                />
            </div>
            <div className="mb-5">
                <TextArea
                    required={true}
                    label="Description"
                    placeholder='Description'
                    {...register("description", {required: true})}
                    className='w-full mt-1'
                    error={errors.description?.message}
                />
            </div>
            <div className="mb-5">
                <MultiSelectInput
                    control={control}
                    required={true}
                    name='categories'
                    multiselect
                    options={categories}
                    error={errors.categories?.message}
                    label="Choose a Category"
                />
            </div>
            <div className="mb-5">
                <MultiSelectInput
                    control={control}
                    required={true}
                    name='brand'
                    options={brands}
                    error={errors.categories?.message}
                    label="Choose a Brand"
                />
            </div>
            {/*-----------------------------  ATTRIBUTES  -------------------------*/}
            <div className="mb-5">
                <div>
                    <div className="my-5 text-dark-grey">Attributes</div>
                    <div>
                        {attributes.map(({id, name, value}) =>
                            <div className="my-5 flex capitalize items-center text-dark-grey border-[1px] border-[#e5e7eb] justify-between w-[400px] bg-white rounded pl-[10px]" key={id}>
                                {`${name} : ${value}`}
                                <DeleteButton remove={() => removeItem(id)}/>
                            </div>)}
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <label className="mb-2">
                    {
                        inpVisible
                            ? <AttrForm
                                name="attributes"
                                control={control}
                                onAdd={(attr) => {

                                    setAttributes(prev => [...prev, attr]);
                                    setInpVisible(false);
                                }}
                            />
                            : <Button className="ml-5" onClick={() => setInpVisible(prev => !prev)}>Add
                                attributes</Button>
                    }
                </label>
            </div>
            <div className="mb-5">
                <Button onClick={submit} className="mt-5">Submit</Button>
            </div>
        </div>
    )
}
