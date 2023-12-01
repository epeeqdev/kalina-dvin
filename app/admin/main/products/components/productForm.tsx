'use client'

import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useProductForm} from "@/app/admin/main/products/helpers/useProductForm";
import {addProduct} from "@/app/admin/main/products/helpers/addProduct";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Input} from "@/components/controls/input";
import {TextArea} from "@/components/controls/text-area";
import MultiSelectInput from "@/components/controls/autocomplete-input";
import {editProduct} from "@/app/admin/main/products/helpers/editProduct";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {BrandResponseDTO, CategoryResponseDTO, ProductResponseDTO} from "@/backend/types";
import AttributesForm from "@/app/admin/main/products/components/attributesForm";
import Alert from "@/app/admin/main/products/helpers/alert";
import {deleteProduct} from "@/app/admin/main/products/helpers/deleteProduct";
import {Button} from "../../components/controls/button";
import {ImageUploader} from "@/app/admin/main/components/form-wrapped-controls/image-uploader";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {getBrands} from "@/app/admin/main/brands/helpers/getBrands";
import {getCategories} from "@/app/admin/main/categories/halpers/getCategories";
import {getProduct} from "@/app/admin/main/categories/halpers/getProduct";

export default function ProductForm({id}: { id: string }) {
    const router = useRouter()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const {data: categoriesResponse, isLoading: categoriesLoading} = useQuery<CategoryResponseDTO[]>(getCategories);
    const {data: productData, isLoading: productLoading} = useQuery<ProductResponseDTO>(getProduct, [id], {fetchOnMount: !!id});
    const {data: brandsResponse, isLoading: brandsLoading} = useQuery<BrandResponseDTO[]>(getBrands);
    const {mutate: deleteProductMutate, isLoading: deleteLoading} = useMutation(deleteProduct);
    const {mutate: editProductMutate, isLoading: editProductLoading} = useMutation(editProduct);
    const {mutate: addProductMutate, isLoading: addProductLoading} = useMutation(addProduct);
    const isLoading = categoriesLoading || brandsLoading || deleteLoading || editProductLoading || addProductLoading || productLoading;

    const {
        errors,
        control,
        register,
        handleSubmit,
        getRequestData
    } = useProductForm(productData);

    const categories = categoriesResponse?.map(item => ({value: item._id, label: item.name.ru})) ?? []
    const brands = brandsResponse?.map((item: BrandResponseDTO) => ({value: item._id, label: item.name.ru}))

    const onSubmit = async () => {
        if (id) {
            editProductMutate(id, getRequestData()).then(() => router.push('/admin/main/products'))
        } else {
            await addProductMutate(getRequestData()).then(data => {
                router.push(`/admin/main/products/edit/${data._id}`)
            })
        }
    }

    const submit = () => {
        handleSubmit(onSubmit)()
    }

    const onDelete = async () => {
        deleteProductMutate(id).then(() => router.push('/admin/main/products'))
    }

    return (
        <div className="mx-auto w-full pb-16">
            {isLoading && <LoadingSpinner/>}
            <PageLayout headerTitle={id ?'Редактировать продукт': "Добавить продукт"} headerButtons={  <>
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
                <Button onClick={() => router.push("/admin/main/products")} variant="secondary">Отмена</Button>
                <Button
                    variant="primary"
                    onClick={submit}
                >
                    Сохранить
                </Button>
            </>}>
            <div className="mx-5 mb-[200px]">
                <div className="mb-5">
                    <ImageUploader control={control} name="images" multiple/>
                </div>
                <div className="mb-4 sm:flex gap-3 w-full">
                    <Input label="Заголовок на армянском"
                           placeholder='Введите заголовок'
                           {...register("title.am")}
                           className='flex-1 mb-2'
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
                <div className="mb-4">
                    <TextArea
                        required
                        label="Описание на армянском"
                        placeholder='Введите описание'
                        {...register("description.am", {required: true})}
                        error={errors.description?.am?.message}
                        className="min-h-[150px] mb-2"
                    />
                    <TextArea
                        required
                        label="Описание на русском"
                        placeholder='Введите описание'
                        {...register("description.ru", {required: true})}
                        error={errors.description?.ru?.message}
                        className="min-h-[150px]"
                    />
                </div>
                <div className="mb-4">
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
                <div className="mb-4">
                    <MultiSelectInput
                        control={control}
                        required
                        name='brand'
                        options={brands}
                        error={errors.brand?.value?.message}
                        label="Выберите бренд"
                    />
                </div>
                <AttributesForm control={control} name='attributes'/>
            </div>
            </PageLayout>
            <Alert onCancel={() => setDeleteModalOpen(false)} onClose={() => setDeleteModalOpen(false)} onAccept={onDelete} isOpen={deleteModalOpen}>
                <p className="text-2xl font-bold">Вы уверены, что хотите удалить данный продукт</p>
                <p className="text-gray-700">После удаления продукт не возможно восстановить!</p>
            </Alert>
        </div>
    )
}