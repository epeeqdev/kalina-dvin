import {Control, Controller} from "react-hook-form";
import AddAttributes from "@/app/admin/main/products/components/addAttributes";
import ShowAttributes from "@/app/admin/main/products/components/showAttributes";
import {useState} from "react";
import {ProductAttribute} from "@/app/admin/main/products/types";
import uniqid from "uniqid";

interface Props {
    control: Control<any>;
    name: string
}


export default function AttributesForm({control, name}: Props) {
    const [isAdding, setAdding] = useState(false);
    return (
            <Controller control={control} name={name} render={({field}) => (
                <div>
                    <ShowAttributes
                        onAddClick={() => setAdding(true)}
                        attributes={field.value}
                        removeItem={
                        (id) => {
                            field.onChange(field?.value?.filter((item: ProductAttribute) => {
                                console.log("is id here", item.id, "||" , id)
                                return item.id !== id
                            }))
                        }
                    }
                    />
                    {isAdding && <AddAttributes onSubmit={(value: ProductAttribute) => {
                        const oldFieldValue = field.value || [];
                        setAdding(false);
                        field.onChange([...oldFieldValue, value])
                    }}
                    onCancel={() => setAdding(false)}
                    />}
                </div>
            )}/>
    )
}
