"use client"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {CategoriesPageDTO, CategoryResponseDTO} from "@/backend/types";
import {getCategoriesPage} from "@/app/admin/helpers/api/getCategoriesPage";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {editCategoriesPage} from "@/app/admin/helpers/api/editCategoriesPage";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {ImageUploader} from "@/app/admin/main/components/form-wrapped-controls/image-uploader";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import React from "react";
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";
import {CATEGORIES_PAGE} from "../../costants";


const validationSchema = yup.object().shape({
    image: yup.object().shape({id: yup.string(), src: yup.string()}).required("Изображение обязательно"),
})
export default function CategoriesPageForm() {

    const router = useRouter()
    const {data, isLoading:dataLoading} = useQuery<CategoryResponseDTO>(getCategoriesPage);
    const {mutate: editCategoriesImage, isLoading: editCategoriesLoading} = useMutation(editCategoriesPage);


    const isLoading = editCategoriesLoading || dataLoading

    const {
        control,
        formState: {errors,isDirty},
        getValues
    } = useForm<CategoriesPageDTO>({
        resolver: yupResolver(validationSchema),
        ...(data ? {
            values: {
                image: data.image
            }
        } : {})
    }) ?? {};

    const onEdit = () => {
        editCategoriesImage(getValues()).then(() => router.push("/admin/main"))
    }
    return (
        <div className="mx-auto w-full col-auto">
            {isLoading && <LoadingSpinner />}
            <PageLayout headerButtons={
                <>
                    {isDirty && !isLoading && <Button variant="primary" onClick={onEdit}>Сохранить</Button>}
                    <ToItemPageButton link={`/main/categories`}/>
                </>
            } headerTitle={CATEGORIES_PAGE}>
                <div className="gap-4 justify-center px-5">
                        <ImageUploader
                            label={{am: "Պաստառ" ,ru:"Обложка"}}
                            control={control}
                            name='image'
                            className="border-none justify-stretch"
                            imageHeightProportion={40}
                            error={errors.image?.message}
                        />
                </div>
            </PageLayout>
        </div>
    )
}