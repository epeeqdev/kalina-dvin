'use client'

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useProductForm} from "@/app/admin/main/products/helpers/useProductForm";
import {addProduct} from "@/app/admin/main/products/helpers/addProduct";
import LoadingSpinner from "@/components/controls/loading-spinner";
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {Input} from "@/components/controls/input";
import {TextArea} from "@/components/controls/text-area";
import MultiSelectInput from "@/components/controls/autocomplete-input";
import axios from "@/axios";
import {editProduct} from "@/app/admin/main/products/helpers/editProduct";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {BrandResponseDTO, CategoryResponseDTO} from "@/backend/types";
import AttributesForm from "@/app/admin/main/products/components/attributesForm";
import Modal from "@/app/admin/main/products/helpers/modal";
import {deleteProduct} from "@/app/admin/main/products/helpers/deleteProduct";
import Link from "next/link";
import {Button} from "../../components/controls/button";
import Alert from "@/app/admin/main/products/helpers/alert";

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
        getValues,
        getRequestData
    } = useProductForm(uniqueProductData);


    const categories = categoriesResponse?.map(item => ({value: item._id, label: item.name.ru})) ?? []
    const brands = brandsResponse?.map((item: BrandResponseDTO) => ({value: item._id, label: item.name.ru}))

    const onSubmit = async () => {
        if (id) {
            editProductMutate(id, getRequestData()).then(() => router.push('/admin/main/products'))
        } else {
            console.log('request dataaa',getRequestData())
            addProductMutate(getRequestData())
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
    console.log(errors)
    console.log(getValues())
    return (
        <div className="xl:w-[60%] mx-auto w-full pb-16">
            {isLoading && <LoadingSpinner/>}
            <h1 className="text-xl mb-5">{id ? "Редактировать продукт" : "Добавить продукт"}</h1>
            <div className="mb-5">
                <ImageGallery control={control} name='images' multiple/>
            </div>
            <div className="mb-5 flex gap-3 w-full">
                <Input label="Заголовок на армянском"
                       placeholder='Введите заголовок'
                       {...register("title.am")}
                       className='flex-1'
                       error={errors.title?.ru?.message}
                       required
                />
                <Input label="Заголовок на русском"
                       placeholder='Введите заголовок'
                       {...register("title.ru")}
                       className='flex-1'
                       error={errors.title?.am?.message}
                       required
                />
            </div>
            <div className="mb-5">
                <TextArea
                    required
                    label="Описание на армянском"
                    placeholder='Введите описание'
                    {...register("description.am", {required: true})}
                    error={errors.description?.am?.message}
                />
                <TextArea
                    required
                    label="Описание на русском"
                    placeholder='Введите описание'
                    {...register("description.ru", {required: true})}
                    error={errors.description?.ru?.message}
                />
            </div>

            <div className="mb-5">
                <MultiSelectInput
                    control={control}
                    required
                    name='categories'
                    multiselect
                    options={categories}
                    error={errors.categories?.message}
                    placeholder='Выберите категории'
                    label="Категории"
                />
            </div>
            <div className="mb-5">
                <MultiSelectInput
                    control={control}
                    required
                    name='brand'
                    options={brands}
                    error={errors.brand?.message}
                    label="Выберите бренд"
                />
            </div>
            {/*-----------------------------  ATTRIBUTES  -------------------------*/}

            <AttributesForm control={control} name='attributes'/>
            <div className="fixed right-4 top-4 flex gap-2">
                {
                    id
                        ?
                        <Button
                            variant="alert"
                            onClick={() => {
                            setDeleteModalOpen(true)
                        }}>Удалить</Button>
                        : <></>
                }
                <Link href="/admin/main/products">
                    <Button variant="secondary">Отмена</Button>
                </Link>
                <Button
                    variant="primary"
                    onClick={submit}
                >
                    Сохранить
                </Button>
            </div>
            <Alert onAccept={onDelete} onClose={() => setDeleteModalOpen(false)} onCancel={() => {}} isOpen={deleteModalOpen}>
                <p className="text-2xl font-bold">Вы уверены, что хотите удалить данный продукт?</p>
                <p className="text-gray-700">После удаления продукт не возможно восстановить!</p>
            </Alert>
        </div>
    )
}