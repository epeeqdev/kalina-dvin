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


const validationSchema = yup.object().shape({
    image: yup.object().shape({extension: yup.string().required(""), id: yup.string().required(""), src: yup.string().required("")}).required(""),
})
export default function CategoriesPageForm() {

    const router = useRouter()
    const {data, isLoading:dataLoading} = useQuery<CategoryResponseDTO>(getCategoriesPage);
    const {mutate: editCategoriesImage, isLoading: editCategoriesLoading} = useMutation(editCategoriesPage);


    const {
        control,
        formState: {errors},
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
            {editCategoriesLoading && <LoadingSpinner />}

            <PageLayout headerButtons={
                <>
                    <Button variant="primary" onClick={onEdit}>Сохранить</Button>
                    <ToItemPageButton link={`/main/categories`}/>
                </>
            } headerTitle={"Страница категорий"}>
                <div className="gap-4 justify-center px-5">
                        <ImageUploader
                            label="Обложка"
                            control={control}
                            name='image'
                            className="border-none justify-stretch"
                            imageHeightProportion={40}
                        />
                </div>
            </PageLayout>
        </div>
    )
}