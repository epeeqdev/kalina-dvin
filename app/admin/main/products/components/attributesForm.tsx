import {Control, Controller} from "react-hook-form";
import AddAttributes from "@/app/admin/main/products/components/addAttributes";
import ShowAttributes from "@/app/admin/main/products/components/showAttributes";
import {useState} from "react";
import {ProductAttribute} from "@/app/admin/main/products/types";
import {Option} from "@/components/controls/autocomplete-input";

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
                        isOpen={isAdding}
                        onAddClick={() => setAdding(prev=> !prev)}
                        attributes={field.value}
                        removeItem={
                        (id) => {
                            field.onChange(field?.value?.filter((item: ProductAttribute) => {
                                return item.id !== id
                            }))
                        }
                    }
                    />
                    {isAdding && <AddAttributes
                        onSubmit={(value: Option) => {
                        const oldFieldValue = field.value || [];
                        setAdding(false);
                        field.onChange([...oldFieldValue, value])
                    }}
                    onCancel={() => setAdding(false)}
                    data={field.value}
                    />}
                </div>
            )}/>
    )
}
