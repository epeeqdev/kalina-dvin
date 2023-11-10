'use client'
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ProductRequestDTO, ProductResponseDTO} from "@/backend/types";
import {
    IMAGE_SCHEMA,
    OPTION_SCHEMA_REQUIRED,
    REQUIRED_FIELD_TEXT,
    SchemaImage, SchemaOption,
    SchemaText,
    TEXT_SCHEMA_REQUIRED
} from "@/utils/form";

export interface ProductForm {
    title: SchemaText,
    description: SchemaText,
    categories: SchemaOption[],
    brand: SchemaOption,
    images?: SchemaImage[],
    attributes?: { attribute: SchemaOption, value: SchemaText, id?:string }[],
}

const validationSchema = yup.object().shape({
    title: TEXT_SCHEMA_REQUIRED,
    description: TEXT_SCHEMA_REQUIRED,
    categories: yup.array(OPTION_SCHEMA_REQUIRED).min(1).required(REQUIRED_FIELD_TEXT),
    brand: OPTION_SCHEMA_REQUIRED,
    images: yup.array(IMAGE_SCHEMA),
    attributes: yup.array(yup.object().shape({attribute: OPTION_SCHEMA_REQUIRED, value: TEXT_SCHEMA_REQUIRED}))
});


export const useProductForm = (data?: ProductResponseDTO) => {

    const formValues: ProductForm | null = data ? {
        title: data.title,
        description: data.description,
        categories: data.categories.map(category => ({label: category.name.ru, value: category._id})),
        brand: {label: data.brand.name.ru, value: data.brand._id},
        images: data.images,
        attributes: data?.attributes?.map(attribute => ({attribute: {label: attribute.attribute?.name.ru, value: attribute.attribute._id},id:attribute.attribute._id, value: attribute.value}))
    } : null;

    const {control, ...values} = useForm<ProductForm>({
        resolver: yupResolver(validationSchema),
        ...(formValues ? {values: formValues} : {}),
    })


    const getRequestData = (): ProductRequestDTO => {
        const {title, description, brand, categories, attributes, images} = values.getValues();
        return {
            title,
            description,
            brand: brand.value,
            categories: categories.map(category => category.value),
            attributes: attributes?.map(attribute => ({
                attribute: attribute.attribute.value,
                value: attribute.value
            })) || [],
            images: images || []
        }
    }
    return {errors: values?.formState?.errors, control, getRequestData, ...values}
}