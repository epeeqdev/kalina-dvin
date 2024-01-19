'use client'
import {TextArea} from "@/components/controls/text-area";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@/app/admin/main/components/controls/button";
import {Input} from "@/components/controls/input";
import {SlideDTO} from "@/backend/types";
import {ObjectSchema} from "yup";
import clsx from "clsx";
import uniqid from "uniqid";
import {ImageUploader} from "@/app/admin/main/components/form-wrapped-controls/image-uploader";
import {ADD_BUTTON, SAVE_BUTTON} from "../../costants";
import { useLanguage } from "@/app/main/hooks/useLanguage";
import {REQUIRED_FIELD_TEXT, REQUIRED_IMAGE} from "@/utils/form";

const validationSchema:ObjectSchema<SlideDTO> = yup.object().shape({
    title: yup.object().shape({am: yup.string().required(REQUIRED_FIELD_TEXT), ru: yup.string().required(REQUIRED_FIELD_TEXT)}),
    description: yup.object().shape({am: yup.string(), ru: yup.string()}),
    image: yup.object().shape({id: yup.string(), src: yup.string()}).required(REQUIRED_IMAGE),
    buttonLink: yup.string(),
    buttonText: yup.object().shape({am: yup.string(), ru: yup.string()})
})

interface Prop {
    id?: string,
    onSubmit?: (value) => void,
    name : string,
    editingSlideData?: SlideDTO
    className?: string
}
export default function SliderForm({onSubmit, editingSlideData, className}: Prop) {

    const { getLanguage } = useLanguage()

    const {
        control,
        handleSubmit,
        register,
        formState: {errors, isDirty},
    } = useForm<SlideDTO>({
        resolver: yupResolver<SlideDTO>(validationSchema),
            values: {
                image: editingSlideData?.image ?  editingSlideData.image : null,
                title: editingSlideData?.title ?  editingSlideData.title : null,
                description: editingSlideData?.description,
                buttonText: editingSlideData?.buttonText,
                buttonLink: editingSlideData?.buttonLink
            }
    });


    const submit = () => {
            handleSubmit((value: SlideDTO) => {
                return onSubmit ? onSubmit({...value, id: value._id || value.id || uniqid()}) : null
            })()
    }

    return (
            <div className={clsx(" mx-auto w-full pb-16", className)}>
                <div className="my-5">
                    <ImageUploader error={errors.image?.message} control={control} name='image' imageHeightProportion={50} className={`${errors.image?.src?.message && "border-2 border-red-600"}`}/>
                </div>
                <div className="mb-2">
                    <Input
                        required
                        label={{am: "Վերնագրի անվանումը ՀԱՅ", ru: "Название Заголовка по АРМ"}}
                        placeholder={{am: "Վերնագրի անվանումը Հայ", ru: "Название Заголовка по АРМ"}}
                        {...register("title.am")}
                        error={errors.title?.am}
                        className="mb-2"
                    />
                    <Input
                        required
                        label={{am: "Վերնագրի անվանումը ՌՈՒՍ", ru: "Название Заголовка по РУС"}}
                        placeholder={{am: "Վերնագրի անվանումը ՌՈՒՍ", ru: "Название Заголовка по РУС"}}
                        {...register("title.ru")}
                        error={errors.title?.ru}
                    />
                </div>
                <div className="mb-2">
                    <TextArea
                        label={{am: "Նկարագրությունը ՀԱՅ", ru: "Описание на АРМ"}}
                        placeholder={{am: "Նկարագրությունը ՀԱՅ", ru: "Описание на АРМ"}}
                        {...register("description.am")}
                        error={errors.description?.am}
                    />
                    <TextArea
                        label={{am: "Նկարագրությունը ՌՈՒՍ", ru: "Описание на РУС"}}
                        placeholder={{am: "Նկարագրությունը ՌՈՒՍ", ru: "Описание на РУС"}}
                        {...register("description.ru")}
                        error={errors.description?.ru}
                    />
                </div>
                <div className="mb-2">
                    <Input
                        label={{am: "Կոճակի հղուումը", ru: "Ссылка Кнопки"}}
                        placeholder={{am: "տեղադրեք հղումը", ru: "Введите Ссылку"}}
                        {...register("buttonLink")}
                        error={errors.buttonLink}
                        className="mb-2"
                    />
                    <Input
                        label={{am: "Կոճակի անվանւմը ՀԱՅ", ru: "Текст кнопки на АРМ"}}
                        placeholder={{am: "Կոճակի անվանւմը ՀԱՅ", ru: "Текст кнопки на АРМ"}}
                        {...register("buttonText.am")}
                        error={errors.buttonText?.am}
                        className="mb-2"
                    />
                    <Input
                        label={{am: "Կոճակի անվանւմը ՌՈՒՍ", ru: "Текст кнопки на РУС"}}
                        placeholder={{am: "Կոճակի անվանւմը ՌՈՒՍ", ru: "Текст кнопки на РУС"}}
                        {...register("buttonText.ru")}
                        error={errors.buttonText?.ru}
                    />
                </div>
                <div className="mt-4">
                    <Button
                        title={editingSlideData ? SAVE_BUTTON : ADD_BUTTON}
                        variant="primary"
                        onClick={submit}
                    >
                    </Button>

                </div>
            </div>
    )
}