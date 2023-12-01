import {Control, Controller} from "react-hook-form";
import AddAttributes from "@/app/admin/main/products/components/addAttributes";
import ShowAttributes from "@/app/admin/main/products/components/showAttributes";
import {useState} from "react";
import {ProductAttribute} from "@/app/admin/main/products/types";
import {Option} from "@/components/controls/autocomplete-input";
import {ProductAttributeResponseDTO} from "@/backend/types";

interface Props {
    control: Control<any>;
    name: string
}


export default function AttributesForm({control, name}: Props) {
    const [isAdding, setAdding] = useState(false);
    const [editingItem, setEditingItem] = useState()


    return (
            <Controller control={control} name={name} render={({field}) => (
                <div>
                    <ShowAttributes
                        isOpen={isAdding}
                        onAddClick={() => {
                            setAdding(prev => !prev)
                        }}
                        attributes={field.value}
                        onEdit={(id) => {
                            const item = field?.value?.find((item: ProductAttribute) => {
                                return item.id === id
                            })
                            setEditingItem(item)
                        }}
                        removeItem={
                        (id) => {
                            field.onChange(field?.value?.filter((item: ProductAttribute) => {
                                return item.id !== id
                            }))
                        }
                    }
                    />
                    {isAdding && <AddAttributes
                        onAddSubmit={(value: Option) => {
                        const oldFieldValue = field.value || [];
                        setAdding(false);
                        field.onChange([...oldFieldValue, value])
                    }}
                        onEditSubmit={(value) => {
                         const editedValues = field.value.map((item) => {
                             if(item.id === value.id){
                                 return value
                             }else{
                                 return item
                             }
                         })
                         setAdding(false);
                         field.onChange(editedValues)
                        }}

                    onCancel={() => setAdding(false)}
                    data={field.value}
                        editingItem={editingItem}
                    />}
                </div>
            )}/>
    )
}
