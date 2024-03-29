"use client"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useQuery} from "@/utils/hooks/useQuery";
import {ImageDTO, ProductsPageDTO} from "@/backend/types";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {editProductsPage} from "@/app/admin/helpers/api/editProductsPage";
import {useMutation} from "@/utils/hooks/useMutation";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {getProductsPage} from "@/app/admin/helpers/api/getProductsPage";
import {ImageUploader} from "@/app/admin/main/components/form-wrapped-controls/image-uploader";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import React from "react";
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";
import {PRODUCTS_PAGE} from "../../costants";


const validationSchema = yup.object().shape({
    image: yup.object().shape({id: yup.string(), src: yup.string().required("regergergergerg")}).required("regergergergerg")
})
export default function ProductsPageForm() {

    const {data: image, isLoading: imageLoading} = useQuery<ProductsPageDTO>(getProductsPage);
    const {mutate: editProductPage, isLoading: editProductLoading} = useMutation(editProductsPage)
    const router = useRouter()


    const isLoading = imageLoading || editProductLoading

    const {
        control,
        formState: {errors, isDirty},
        getValues
    } = useForm<ImageDTO>({
        resolver: yupResolver(validationSchema),
        ...(image ? {
            values: {
                image: image?.image
            }
        } : {})
    });

    const onEdit = () => {
        editProductPage(getValues()).then(() => router.push("/admin/main"))
    }

    return (

        <div className="mx-auto w-full col-auto">
            {isLoading && <LoadingSpinner/>}
            <PageLayout headerButtons={
                <>
                    {isDirty && !isLoading && <Button variant="primary" onClick={onEdit}>Сохранить</Button>}
                    <ToItemPageButton link={`/main/products`}/>
                </>
            } headerTitle={PRODUCTS_PAGE}>
                <div className="gap-4 justify-center mx-5">
                    <ImageUploader
                        error={errors?.src?.message}
                        label={{am: "Պաստառ" ,ru:"Обложка"}}
                        control={control}
                        name='image'
                        imageClassName='object-cover'
                        imageHeightProportion={40}
                        className="border-none"/>
                </div>
            </PageLayout>
        </div>
    )
}