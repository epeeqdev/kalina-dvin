import * as yup from "yup";
import {useForm} from "react-hook-form";
import {Product} from "@/app/admin/main/products/types";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("This field is required").min(10, "The minimum length is 10."),
    categories: yup.array().required(),
})

export const useAddProductForm = () => {
    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: {
            errors
        }
    } = useForm<Product>({
        resolver: yupResolver(validationSchema)
    })
    console.log('valueees', getValues())
    return {register, handleSubmit, control, errors}
}