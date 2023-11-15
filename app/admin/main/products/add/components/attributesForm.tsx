import {Control} from "react-hook-form";
import {Controller} from "react-hook-form";
import AddAttributes from "@/app/admin/main/products/add/components/addAttributes";
import ShowAttributes from "@/app/admin/main/products/add/components/showAttributes";
import {useState} from "react";
import {ProductAttribute} from "@/app/admin/main/products/types";

interface Props {
    control: Control<any>;
    name: string
}


export default function AttributesForm({control, name}: Props) {
    const [isAdding, setAdding] = useState(false);
    return (
            <Controller control={control} name={name} render={({field, formState}) => (
                <div>
                    <ShowAttributes onAddClick={() => setAdding(true)} attributes={field.value} removeItem={(id) => field.onChange(field.value.filter((item:ProductAttribute) => item.id !== id))}/>
                    {isAdding && <AddAttributes onSubmit={(value: ProductAttribute) => {
                        const oldFieldValue = field.value || [];
                        setAdding(false);
                        field.onChange([...oldFieldValue, value])
                    }}/>}
                </div>
            )}/>
    )
}
