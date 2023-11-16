'use client'
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {TextArea} from "@/components/controls/text-area";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@/app/admin/main/components/controls/button";
import {Input} from "@/components/controls/input";
import {SlideDTO} from "@/backend/types";
import {ObjectSchema} from "yup";
import clsx from "clsx";

const validationSchema:ObjectSchema<SlideDTO> = yup.object().shape({
    title: yup.object().shape({
        am: yup.string().required("Обязательное поле"),
        ru: yup.string().required("Обязательное поле")
    }).required(),
    description: yup.object().shape({
        am: yup.string().required("Обязательное поле"),
        ru: yup.string().required("Обязательное поле")
    }).required(),
    image: yup.object().shape({extension: yup.string().required("Обязательно добавить картинку"), id: yup.string().required("Обязательно добавить картинку"), src: yup.string().required("Обязательно добавить картинку")}),
    buttonLink: yup.string(),
    buttonText: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")})
})

interface Prop {
    id?: string,
    onSubmit?: (value: SlideDTO) => void,
    name : string,
    editingSlideData?: SlideDTO
    className?: string
}
export default function SliderForm({id, onSubmit, editingSlideData, className}: Prop) {

    const {
        control,
        handleSubmit,
        register,
        getValues,
        formState: {errors}
    } = useForm<SlideDTO>({
        resolver: yupResolver<SlideDTO>(validationSchema),
        ...(editingSlideData ? {
            values: editingSlideData
        } : {})
    });


    const submit = () => {
            handleSubmit((data) => {
                return onSubmit ? onSubmit({...data}) : null
            })()
    }

    return (
            <div className={clsx("xl:w-[60%] mx-auto w-full pb-16", className)}>
                <h1 className="text-xl mb-5">{id ? "Редактировать Слайд" : "Добавить Слайд"}</h1>
                <div className="mb-5">
                    <ImageGallery control={control} name='image' className={`mb-5 ${errors.image?.src?.message && "border-2 border-red-600"}`}/>
                    {errors.image?.src?.message && <span className="text-red-600 text-sm">{errors.image?.src?.message}</span>}
                </div>
                <div className="mb-2">
                    <Input
                        required
                        label="Загаловок на армянском"
                        placeholder='Введите заголовок'
                        {...register("title.am")}
                        error={errors.title?.am?.message}
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
                        required
                        label="Oписание на армянском"
                        placeholder='Введите описание'
                        {...register("description.am")}
                        error={errors.description?.am?.message}
                    />
                    <TextArea
                        required
                        label="Oписание на русском"
                        placeholder='Введите описание'
                        {...register("description.ru")}
                        error={errors.description?.ru?.message}
                    />
                </div>
                <div className="mb-2">
                    <Input
                        required
                        label="Ссылка Кнопки"
                        placeholder='Введите заголовок'
                        {...register("buttonLink")}
                        error={errors.buttonLink?.message}
                    />
                    <Input
                        required
                        label="Текст Кнопки Ам"
                        placeholder='Введите Текст Ам'
                        {...register("buttonText.am")}
                        error={errors.buttonText?.am?.message}
                    />
                    <Input
                        required
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