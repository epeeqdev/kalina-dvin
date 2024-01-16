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
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";
import {ADD_PRODUCT, CANCEL_BUTTON, DELETE_BUTTON, EDIT_PRODUCT, SAVE_BUTTON} from "../../costants";

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
        getRequestData,
        isDirty
    } = useProductForm(productData);

    const categories = categoriesResponse?.map(item => ({value: item._id, label: {am: item.name.am, ru: item.name.ru}})) ?? []
    const brands = brandsResponse?.map((item: BrandResponseDTO) => ({value: item._id, label: {am: item.name.am, ru: item.name.ru}}))

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
            <PageLayout headerTitle={id ? EDIT_PRODUCT : ADD_PRODUCT} headerButtons={  <>
                {
                    id
                        ?
                        <Button
                            title={DELETE_BUTTON}
                            variant="alert"
                            onClick={() => {
                                setDeleteModalOpen(true)
                            }}></Button>
                        : <></>
                }
                <Button title={CANCEL_BUTTON} onClick={() => router.push("/admin/main/products")} variant="secondary"></Button>
                {isDirty && !isLoading && <Button title={SAVE_BUTTON} variant="primary" onClick={submit}></Button>}
                {productData?._id && <ToItemPageButton link={`/main/products/${productData._id}`}/>}
            </>}>
            <div className="mx-5 mb-[200px]">
                <div className="mb-5">
                    <ImageUploader control={control} name="images" multiple/>
                </div>
                <div className="mb-4 sm:flex gap-3 w-full">
                    <Input
                        label={{am: "Վերնագիրի անվանումը ՀԱՅ", ru: "Название Заголовка по АРМ"}}
                        placeholder={{am: "Վերնագիրի անվանումը Հայ", ru: "Название Заголовка по АРМ"}}
                        {...register("title.am")}
                        className='flex-1 mb-2'
                        error={errors?.title?.am}
                        required
                    />
                    <Input
                        label={{am: "Վերնագիրի անվանումը ՌՈՒՍ", ru: "Название Заголовка по РУС"}}
                        placeholder={{am: "Վերնագիրի անվանումը ՌՈՒՍ", ru: "Название Заголовка по РУС"}}
                        {...register("title.ru")}
                        className='flex-1'
                        error={errors?.title?.ru}
                        required
                    />
                </div>
                <div className="mb-4">
                    <TextArea
                        required
                        label={{am: "Նկարագրությունը ՀԱՅ", ru: "Описание на АРМ"}}
                        placeholder={{am: "Նկարագրությունը ՀԱՅ", ru: "Описание на АРМ"}}
                        {...register("description.am", {required: true})}
                        error={errors.description?.am}
                        className="min-h-[150px]"
                    />
                    <TextArea
                        required
                        label={{am: "Նկարագրությունը ՌՈՒՍ", ru: "Описание на РУС"}}
                        placeholder={{am: "Նկարագրությունը ՌՈՒՍ", ru: "Описание на РУС"}}
                        {...register("description.ru", {required: true})}
                        error={errors.description?.ru}
                        className="min-h-[150px]"
                    />
                </div>
                    <MultiSelectInput
                        control={control}
                        required
                        name='categories'
                        multiselect
                        options={categories}
                        error={errors.categories?.message}
                        label={{am: "Կատեգորիաներ", ru: "Категории"}}
                        placeholder={{am: "Ավելացնել կատեգորիա", ru: "Выберите категории"}}
                    />
                    <MultiSelectInput
                        control={control}
                        required
                        name='brand'
                        options={brands}
                        error={errors.brand?.value?.message}
                        label={{am: "Ընտրել բրենդ", ru: "Выберите бренд"}}
                    />
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