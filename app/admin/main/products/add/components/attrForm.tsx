import {Input} from "@/components/controls/input";
import {Button} from "@/components/controls/button";
import {Control, useForm} from "react-hook-form";
import {ProductAttribute} from "@/app/admin/main/products/types";
import uniqid from "uniqid";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Controller} from "react-hook-form";
import {ProductFormFields} from "@/app/admin/main/products/add/form";

interface Props {
    onAdd?: (attribute: ProductAttribute) => void;
    control: Control<ProductFormFields>;
    name : keyof ProductFormFields
}
const schema = yup.object().shape({
    name: yup.string().required("Title is required"),
    value: yup.string().required("This field is required")
})


export default function AttrForm({name , control , onAdd = () => null}: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors }, reset }
        = useForm({resolver: yupResolver(schema)});
    const attrOnSubmit = (changeFunction: (attr: ProductAttribute) => void) => {
        handleSubmit((data) => {
            changeFunction({...data, id: uniqid()});
            onAdd({...data, id: uniqid()});
        })()
    }

    return <Controller control={control} name={name} render={({field, formState}) =>{
        return (
            <div className="flex gap-2 mt-1">
                <div>
                    <Input className={errors.name && "border-2 border-red-600 rounded outline-red-600"} placeholder="Add name" {...register("name", {required: true})}/>
                    <span className="m-0 text-red-600 text-sm">{errors.name?.message}</span>
                </div>
                <div>
                    <Input className={errors.value && "border-2 border-red-600 rounded outline-red-600"} placeholder="Add value" {...register("value", {required: true})} />
                    <span className="text-red-600 text-sm">{errors.value?.message}</span>
                </div>
                <div>
                    <Button onClick={() => {
                        attrOnSubmit(field.onChange)
                    }}>Add</Button>
                </div>
            </div>
        )
    } }/>
}
