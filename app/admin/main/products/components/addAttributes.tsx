import MultiSelectInput, {Option} from "@/components/controls/autocomplete-input";
import {Input} from "@/components/controls/input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useQuery} from "@/utils/hooks/useQuery";
import {AttributesResponseDTO, ProductRequestDTO} from "@/backend/types";
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
    onSubmit?: (value: Option & {attribute: Option}) => void
    onCancel?: () => void
    data?: Option & {attribute: Option}[]
}
export default function AddAttributes({onSubmit, onCancel, data}: Props){
    const chosenValues = data?.map(item => item.attribute?.value)

    const {data: attributesResponse} = useQuery<AttributesResponseDTO[]>(() => axios.get(`/api/attributes`), [], )
    const attributesOptions = attributesResponse?.filter(item => !chosenValues?.find(option => option === item._id))?.map(item => ({label: item?.name?.ru, value: item?._id}));
    const attrOnSubmit = () => {
        handleSubmit((data: ProductRequestDTO) => {
            onSubmit({...data, id: uniqid()});
        })()
    }

    const {
        register,
        handleSubmit,
        control: localFormControl,
        formState: {errors}
    }
        = useForm({
        resolver: yupResolver(schema)
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
                    <Input
                        placeholder="Значение на русском" {...register("value.ru")}
                        error={errors.value?.ru?.message}
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <Button variant="secondary" className="h-[40px]" onClick={attrOnSubmit}>Добавить</Button>
                    <Button variant="alert" className="h-[40px]" onClick={onCancel}>Отменить</Button>
                </div>
            </div>
    )
}