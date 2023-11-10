'use client'

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useAddProductForm} from "@/app/admin/main/products/components/addForm";
import {addProduct} from "@/app/admin/main/products/helpers/addProduct";
import LoadingSpinner from "@/components/controls/loading-spinner";
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {Input} from "@/components/controls/input";
import {TextArea} from "@/components/controls/text-area";
import MultiSelectInput from "@/components/controls/autocomplete-input";
import {Button} from "@/components/controls/button";
import axios from "@/axios";
import {editProduct} from "@/app/admin/main/products/helpers/editProduct";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {BrandResponseDTO, CategoryResponseDTO} from "@/backend/types";
import AttributesForm from "@/app/admin/main/products/components/attributesForm";
import DeleteConfirmationModal from "@/app/admin/main/products/helpers/deleteProductModal";
import {deleteProduct} from "@/app/admin/main/products/helpers/deleteProduct";
import Link from "next/link";

export default function ProductForm({id}: { id: string }) {
    const router = useRouter()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [uniqueProductData, setUniqueProductData] = useState();
    const {data: categoriesResponse, isLoading: categoriesLoading} = useQuery<CategoryResponseDTO[]>(() => axios.get(`/api/categories`));
    const {data: brandsResponse, isLoading: brandsLoading} = useQuery<BrandResponseDTO[]>(() => axios.get(`/api/brands`));
    const {mutate: deleteProductMutate, isLoading: deleteLoading} = useMutation(deleteProduct);
    const {mutate: editProductMutate, isLoading: editProductLoading} = useMutation(editProduct);
    const {mutate: addProductMutate, isLoading: addProductLoading} = useMutation(addProduct);
    const isLoading = categoriesLoading || brandsLoading || deleteLoading || editProductLoading || addProductLoading;

    const {
        errors,
        control,
        register,
        handleSubmit,
        getRequestData
    } = useAddProductForm(uniqueProductData);


    const categories = categoriesResponse?.map(item => ({value: item._id, label: item.name.ru})) ?? []
    const brands = brandsResponse?.map((item: BrandResponseDTO) => ({value: item._id, label: item.name.ru}))

    const onSubmit = async () => {
        if (id) {
            editProductMutate(id, getRequestData()).then(() => router.push('/admin/main/products'))
        } else {
            addProductMutate(getRequestData()).then(() => router.push('/admin/main/products'))
        }
    }

    const getProductWithId = () => {
        id && axios.get(`/api/product/${id}`)
            .then(response => {
                setUniqueProductData(response.data)
            })
            .catch((e) => {
                console.log("error", e)
            })
    }

    useEffect(() => {
        if (id) {
            getProductWithId()
        }
    }, [])


    const submit = () => {
        handleSubmit(() => {
            onSubmit()
        })()
    }

    const onDelete = async () => {
        deleteProductMutate(id).then(() => router.push('/admin/main/products'))
    }

    return (
        <div className="xl:w-[60%] mx-auto w-full">
            {isLoading && <LoadingSpinner/>}
            <h1 className="text-xl mb-5">{id ? "Edit Product" : "Add Product"}</h1>
            <div className="mb-5">
                <ImageGallery control={control} name='images' multiple/>
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

            <AttributesForm control={control} name='attributes'/>
            <div className="fixed right-4 top-4 flex gap-2">
                {
                    id
                        ?
                        <Button className='w-[100px] bg-red-700 hover:bg-red-800 text-white' onClick={() => {
                            setDeleteModalOpen(true)
                        }}>Удалить</Button>
                        : <></>
                }
                <Link href="/admin/main/products">
                    <Button className="bg-blue-700 hover:bg-blue-800 w-[100px]">Отмена</Button>
                </Link>
                <Button className='w-[200px] bg-green-800 hover:bg-green-900' onClick={submit}>Сохранить</Button>

            </div>
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={onDelete}
            />
        </div>
    )
}