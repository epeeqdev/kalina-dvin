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

const validationSchema:ObjectSchema<SlideDTO> = yup.object().shape({
    title: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}),
    description: yup.object().shape({am: yup.string(), ru: yup.string()}),
    image: yup.object().shape({id: yup.string(), src: yup.string()}).required("Обязательно добавить картинку"),
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
                        label="Загаловок на армянском"
                        placeholder='Введите заголовок'
                        {...register("title.am")}
                        error={errors.title?.am?.message}
                        className="mb-2"
                    />
                    <Input
                        required
                        label="Загаловок на русском"
                        placeholder='Введите заголовок'
                        {...register("title.ru")}
                        error={errors.title?.ru?.message}
                    />
                </div>
                <div className="mb-2">
                    <TextArea
                        label="Oписание на армянском"
                        placeholder='Введите описание'
                        {...register("description.am")}
                        error={errors.description?.am?.message}
                    />
                    <TextArea
                        label="Oписание на русском"
                        placeholder='Введите описание'
                        {...register("description.ru")}
                        error={errors.description?.ru?.message}
                    />
                </div>
                <div className="mb-2">
                    <Input
                        label="Ссылка Кнопки"
                        placeholder='Введите заголовок'
                        {...register("buttonLink")}
                        error={errors.buttonLink?.message}
                        className="mb-2"
                    />
                    <Input
                        label="Текст Кнопки Ам"
                        placeholder='Введите Текст Ам'
                        {...register("buttonText.am")}
                        error={errors.buttonText?.am?.message}
                        className="mb-2"
                    />
                    <Input
                        label="Текст Кнопки Ру"
                        placeholder='Введите Текст Ру'
                        {...register("buttonText.ru")}
                        error={errors.buttonText?.ru?.message}
                    />
                </div>
                <div className="mt-4">
                    <Button
                        variant="primary"
                        onClick={submit}
                    >
                        {editingSlideData ? "Сохранить" : "Добавить"}
                    </Button>

                </div>
            </div>
    )
}