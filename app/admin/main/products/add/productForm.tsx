"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {CategoriesItem, ProductAttribute} from "@/app/admin/main/products/types";
import {useAddProductForm} from "@/app/admin/main/products/add/form";
import {addProduct} from "@/app/admin/main/products/helpers/addProduct";
import LoadingSpinner from "@/components/controls/loading-spinner";
import ImageGallery from "@/app/admin/main/products/add/components/ImageGallery";
import {Input} from "@/components/controls/input";
import {TextArea} from "@/components/controls/text-area";
import MultiSelectInput from "@/components/controls/autocomplete-input";
import DeleteButton from "@/components/controls/delete-button/page";
import AttrForm from "@/app/admin/main/products/add/components/attrForm";
import {Button} from "@/components/controls/button";
import axios from "@/axios";
import {editProduct} from "@/app/admin/main/products/helpers/editProduct";
import {useQuery} from "@/utils/hooks/useQuery";
import {CategoryResponseDTO} from "@/backend/types";

export default function ProductForm({id}:{id: any}){
    const router = useRouter()
    const [brands , setBrands] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [inpVisible, setInpVisible] = useState<boolean>(false)
    const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
    const [uniqueProductData, setUniqueProductData] = useState<any>();
    const {data: categoriesResponse} = useQuery<CategoryResponseDTO[]>(() => axios.get(`/api/categories`))

    const {
        errors,
        control,
        register,
        handleSubmit,
        getValues,
        getRequestData
    } = useAddProductForm(uniqueProductData);


    console.log(errors)

    const categories = categoriesResponse?.map(item => ({value : item._id , label: item.name.ru})) ?? []
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

    const onSubmit = async () => {
        setLoading(true)
        if(id){
            await editProduct(id, getRequestData())
                .then(() => router.push('/admin/main/products'))
                .catch((err) => console.log(err))
                .finally(() => setLoading(false))
        }else{
            await addProduct(getRequestData())
                .then(() => router.push('/admin/main/products'))
                .catch((e) => console.log(e))
                .finally(() => setLoading(false))
        }

    }

    const getProductWithId = () => {
       id && axios.get(`/api/product/${id}`)
           .then(response => {
               setUniqueProductData(response.data)
           })
           .catch((e) => {
           console.log("error" , e)
       })
    }

    useEffect(() => {
        if(id){
            getProductWithId()
        }
        getBrands()
    },[])

    const submit = () => {

        handleSubmit((data) => {
            console.log("HANDLE SUBMIT")
            onSubmit(data)
        })()
    }

    console.log(getValues())

    return (
        <div className="xl:w-[60%] mx-auto w-full">
            {isLoading && <LoadingSpinner/>}
            <h1 className="text-xl mb-5">{id ? "Edit Product" : "Add Product"}</h1>
            <div className="mb-5">
                <ImageGallery control={control} name='images'/>
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
                    error={errors.brand?.message}
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
            <div className="fixed right-4 top-4">
                <Button className='w-[150px]' onClick={submit}>Сохранить</Button>
            </div>
        </div>
    )
}