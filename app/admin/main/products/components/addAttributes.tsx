import MultiSelectInput from "@/components/controls/autocomplete-input";
import {Input} from "@/components/controls/input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useQuery} from "@/utils/hooks/useQuery";
import {AttributesResponseDTO} from "@/backend/types";
import axios from "@/axios";
import {Button} from "../../components/controls/button";
import uniqid from "uniqid";

const schema = yup.object().shape({
    am: yup.string().required("AM language is required"),
    ru: yup.string().required("RU language is required"),
    attribute: yup.object().required("Attribute name is required")
})

interface Props {
    onSubmit?: any
    onCancel?: () => void
}
export default function AddAttributes({onSubmit, onCancel}: Props){

    const {data: attributesResponse} = useQuery<AttributesResponseDTO>(() => axios.get(`/api/attributes`), [], )
    const attributesOptions = attributesResponse?.map(item => ({label: item?.name?.ru, value: item?._id}));
    const attrOnSubmit = () => {
        handleSubmit((data) => {
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
                    <Input className={errors.am && "border-2 border-red-600 rounded outline-red-600"}
                           placeholder="Add AM value" {...register("am", {required: true})}/>
                    <span className="m-0 text-red-600 text-sm">{errors.am?.message}</span>
                </div>
                <div>
                    <Input className={errors.ru && "border-2 border-red-600 rounded outline-red-600"}
                           placeholder="Add RU value" {...register("ru", {required: true})} />
                    <span className="text-red-600 text-sm">{errors.ru?.message}</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="h-[40px]" onClick={attrOnSubmit}>добавить</Button>
                    <Button variant="alert" className="h-[40px]" onClick={onCancel}>отменить</Button>
                </div>
            </div>
        </div>
    )
}