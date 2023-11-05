import * as yup from "yup";
import {useForm} from "react-hook-form";
import {Product} from "@/app/admin/main/products/types";
import {yupResolver} from "@hookform/resolvers/yup";
import {Option} from "@/components/controls/autocomplete-input";
import {ProductRequestDTO} from "@/backend/types";



const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("This field is required").min(10, "The minimum length is 10."),
    categories: yup.array(yup.object().shape({label: yup.string(), value: yup.string()})).min(1).required("Categories is required"),
    brand: yup.object().shape({label: yup.string(), value: yup.string()}).required("Brand is required"),
    images: yup.array(yup.object().shape({src: yup.string(), id: yup.string(), extension: yup.string()})),
    attributes: yup.array(yup.object().shape({label: yup.string(), value: yup.string()}))
})

export interface ProductFormFields {
    title: string,
    description:string,
    categories: Option[],
    brand : Option,
}
export const useAddProductForm = (data?: Product) => {
    const { control,...values} = useForm<any>({
        resolver: yupResolver(validationSchema),
        values: {
            title : data?.title,
            description : data?.description,
            categories: data?.categories.map(item => ({label: item.name.ru, value: item._id})),
            images: data?.images,
            brand: {label: data?.brand?.name.ru, value: data?.brand?._id},
            attributes: []
        }
    });

    const getRequestData = ():ProductRequestDTO => {
        const formValues = values.getValues();
        const categories = formValues?.categories.map(item => item.value!)
        const brand = formValues.brand.value!;

        return {...formValues, categories: categories, brand}
    }
    return {errors: values.formState.errors,control, getRequestData, ...values}
}