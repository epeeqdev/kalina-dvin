import MultiSelectInput from "@/components/controls/autocomplete-input";
import {Input} from "@/components/controls/input";
import {Button} from "@/components/controls/button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import uniqid from "uniqid";
import * as yup from "yup";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useQuery} from "@/utils/hooks/useQuery";
import {AttributesResponseDTO} from "@/backend/types";
import axios from "@/axios";

export default function AddAttributes({onSubmit}:{onSubmit : any}){
    const {data: attributesResponse} = useQuery<AttributesResponseDTO>(() => axios.get(`/api/attributes`))
    const attrOnSubmit = () => {
        handleSubmit((data) => {
            onSubmit(data);
        })()
    }

    const schema = yup.object().shape({
        am: yup.string().required("AM language is required"),
        ru: yup.string().required("RU language is required"),
        attribute: yup.object().required("Attribute name is required")
    })

    const {
        register,
        handleSubmit,
        getValues,
        control: localFormControl,
        formState: {errors}, reset
    }
        = useForm({
        resolver: yupResolver(schema)
    });

    const attributesOptions = attributesResponse?.map(item => ({label: item.name.ru, value: item._id}));

    console.log(attributesOptions)
    return (
        <div>
            <MultiSelectInput
                control={localFormControl}
                options={attributesOptions}
                name='attribute'
                label={"Select Attributes"}
                error={errors.attribute?.message}
            />
            <div className="flex gap-2 mt-1">
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
                <div>
                    <Button onClick={attrOnSubmit}>Add</Button>
                </div>
            </div>
        </div>
    )
}