'use client'
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {Product} from "@/app/admin/main/products/types";
import {yupResolver} from "@hookform/resolvers/yup";
import {ProductRequestDTO} from "@/backend/types";
import {
    IMAGE_SCHEMA,
    OPTION_SCHEMA,
    REQUIRED_FIELD_TEXT,
    SchemaImage, SchemaOption,
    SchemaText,
    TEXT_SCHEMA_REQUIRED
} from "@/utils/form";

interface ProductForm {
    title: SchemaText,
    description: SchemaText,
    categories: SchemaOption[],
    brand: SchemaOption[],
    images: SchemaImage[],
    attributes: SchemaOption[],
}

const validationSchema = yup.object().shape({
    title: TEXT_SCHEMA_REQUIRED,
    description: TEXT_SCHEMA_REQUIRED,
    categories: yup.array(OPTION_SCHEMA).min(1).required(REQUIRED_FIELD_TEXT),
    brand: OPTION_SCHEMA.required(REQUIRED_FIELD_TEXT),
    images: yup.array(IMAGE_SCHEMA),
    attributes: yup.array(OPTION_SCHEMA)
});


export const useAddProductForm = (data?: Product) => {
    const {control, ...values} = useForm<ProductForm>({
        resolver: yupResolver(validationSchema),
        ...(data ? {
            values: {
                title: data?.title,
                description: data?.description,
                categories: data?.categories?.map(item => ({label: item?.name?.ru, value: item?._id})),
                images: data?.images,
                brand: data?.brand
                    ? {label: data?.brand?.name.ru, value: data?.brand?._id}
                    : null,
                attributes: data?.attributes?.map(item => ({...item, attribute: {...item.attribute, label: item.attribute?.name?.ru, value: item.attribute?._id}}))
            }
        } : {})
    }) ?? {};


    const getRequestData = (): ProductRequestDTO => {
        const formValues = values.getValues();
        const categories = formValues?.categories.map(item => item.value!)
        const brand = formValues?.brand.value!;
        const attributes = formValues?.attributes


        return {...formValues, categories, brand, attributes}
    }
    return {errors: values?.formState?.errors, control, getRequestData, ...values}
}