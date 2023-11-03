import * as yup from "yup";
import {useForm} from "react-hook-form";
import {Categories} from "@/app/admin/main/products/types";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("This field is required").min(10, "The minimum length is 10."),
    categories: yup.array().min(1).required("Categories is required"),
    // brand: yup.array().min(1).required("Brand is required"),
})

export interface ProductFormFields {
    title: string,
    description:string,
    categories: Categories[],
    brand : string
}

export const useAddProductForm = () => {
    const { control,...values} = useForm<ProductFormFields>({
        resolver: yupResolver(validationSchema)
    });
    return {errors: values.formState.errors,control, ...values}
}