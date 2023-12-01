import MultiSelectInput, {Option} from "@/components/controls/autocomplete-input";
import {Input} from "@/components/controls/input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useQuery} from "@/utils/hooks/useQuery";
import {AttributesResponseDTO, ProductAttributeResponseDTO, ProductRequestDTO} from "@/backend/types";
import axios from "@/axios";
import {Button} from "../../components/controls/button";
import uniqid from "uniqid";
import {REQUIRED_FIELD_TEXT} from "@/utils/form";

const schema = yup.object().shape({
    value: yup.object().shape({
        am: yup.string().required(REQUIRED_FIELD_TEXT),
        ru: yup.string().required(REQUIRED_FIELD_TEXT),
    }),
    attribute: yup.object().required(REQUIRED_FIELD_TEXT)
})

interface Props {
    onAddSubmit?: (value: ProductAttributeResponseDTO & {id: string}) => void
    onEditSubmit?: (value: ProductAttributeResponseDTO & { id: string }) => void
    onCancel?: () => void
    data?: Option & {attribute: Option}[]
    editingItem?: ProductAttributeResponseDTO
}
export default function AddAttributes({onAddSubmit, onCancel, data, editingItem, onEditSubmit}: Props){

    const chosenValues = data?.map(item => item.attribute?.value)

    const {data: attributesResponse} = useQuery<AttributesResponseDTO[]>(() => axios.get(`/api/attributes`), [], )
    const attributesOptions = attributesResponse?.filter(item => !chosenValues?.find(option => option === item._id))?.map(item => ({label: item?.name?.ru, value: item?._id}));
    const attrOnSubmit = () => {
        handleSubmit((data: ProductAttributeResponseDTO & { id: string }) => {
            if(editingItem){
                onEditSubmit(data)
            }else{
                onAddSubmit({...data, id: uniqid()});
            }

        })()
    }

    const {
        register,
        handleSubmit,
        control: localFormControl,
        formState: {errors},
    }
        = useForm({
        resolver: yupResolver(schema),
        ...(editingItem ? {
            values: editingItem
        }: {})
    });

    return (
            <div className="gap-2 mt-2 w-full">
                <MultiSelectInput
                    className="w-full gap-4 mb-2"
                    control={localFormControl}
                    options={attributesOptions}
                    name='attribute'
                    label={"Select Attributes"}
                    error={errors.attribute?.message}
                />
                <div className='mb-2'>
                    <Input
                        placeholder="Значение на армянском" {...register("value.am")}
                        error={errors.value?.am?.message}
                    />
                </div>
                <div className='mb-2'>
                    <Input className={errors?.value?.ru && "border-2 border-red-600 rounded outline-red-600"}
                           placeholder="Значение на русском" {...register("value.ru", {required: true})} />
                    <span className="text-red-600 text-sm">{errors.value?.ru?.message}</span>
                </div>
                <div className="flex gap-2 justify-end">
                    <Button variant="secondary" className="h-[40px]" onClick={attrOnSubmit}>{editingItem ? "Сохранить" :"Добавить"}</Button>
                    <Button variant="alert" className="h-[40px]" onClick={onCancel}>Отменить</Button>
                </div>
            </div>
    )
}