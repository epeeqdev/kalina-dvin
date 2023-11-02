import {Input} from "@/components/controls/input";
import {Button} from "@/components/controls/button";
import {useForm} from "react-hook-form";
import {ProductAttribute} from "@/app/admin/main/products/types";
import uniqid from "uniqid";

interface Props {
    onAdd?: (attribute: ProductAttribute) => void;
}
export default function AttrForm({onAdd = () => null}: Props){

    const {register, handleSubmit,formState: { errors }} = useForm<ProductAttribute>({
        shouldUseNativeValidation: true,
    })

    const attrOnSubmit = (attrData: ProductAttribute) => {
        onAdd({...attrData, id: uniqid()})
    }

    return (
        <div>
            <form className="flex gap-2 my-3" onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                console.log('submit')
                handleSubmit(attrOnSubmit)(e)}} >
                <div>
                    <Input {...register("name", { required: true })} className={`${errors.name && "outline-red-600 border-2 border-red-600 rounded"}`}/>
                    {errors.name && <div className="text-red-600 block">This field is required</div>}
                </div>
                <div>
                    <Input {...register("value", { required: true })} className={`${errors.value && "outline-red-600 border-2 border-red-600 rounded"}`}/>
                    {errors.value && <div className="text-red-600 block ">This field is required</div>}
                </div>
                <div>
                    <Button type="submit">Add</Button>
                </div>

            </form>
        </div>

    )
}
