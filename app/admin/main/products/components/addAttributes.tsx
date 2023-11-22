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
        <div>
            <MultiSelectInput
                control={localFormControl}
                options={attributesOptions}
                name='attribute'
                label={"Select Attributes"}
                error={errors.attribute?.message}
            />
            <div className="flex gap-2 mt-2 w-full">
                <div>
                    <Input className={errors?.value?.am && "border-2 border-red-600 rounded outline-red-600"}
                           placeholder="Значение на армянском" {...register("value.am", {required: true})}/>
                    <span className="m-0 text-red-600 text-sm">{errors.value?.am?.message}</span>
                </div>
                <div>
                    <Input className={errors?.value?.ru && "border-2 border-red-600 rounded outline-red-600"}
                           placeholder="Значение на русском" {...register("value.ru", {required: true})} />
                    <span className="text-red-600 text-sm">{errors.value?.ru?.message}</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="h-[40px]" onClick={attrOnSubmit}>добавить</Button>
                    <Button variant="alert" className="h-[40px]" onClick={onCancel}>отменить</Button>
                </div>
            </div>
        </div>
    )
}