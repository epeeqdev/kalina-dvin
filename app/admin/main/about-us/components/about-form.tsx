'use client'

import {useRouter} from "next/navigation";
import {useState} from "react";
import LoadingSpinner from "@/components/controls/loading-spinner";
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {TextArea} from "@/components/controls/text-area";
import axios from "@/axios";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import Link from "next/link";
import {Button} from "../../components/controls/button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {editAbout} from "@/app/admin/main/about-us/helpers/editAboutUsContent";
import {AboutUsDTO} from "@/backend/types";
import {Input} from "@/components/controls/input";

const validationSchema = yup.object().shape({
    homePageDescription: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле"),}),
    aboutUsPageDescriptionTop: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}),
    aboutUsPageDescriptionBottom: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}),
    image: yup.object().shape({extension: yup.string(), id: yup.string(), src: yup.string() }).nullable(),
    assortmentCount: yup.number().required("Обязательное поле"),
    brandsCount: yup.number().required("Обязательное поле"),
    partnersCount: yup.number().required("Обязательное поле"),

})
export default function AboutForm() {
    const router = useRouter()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const {data: about, isLoading: getaAboutUsLoading} = useQuery<AboutUsDTO>(() => axios.get(`/api/pages/about-us`));
    const {mutate: editAboutUsMutate, isLoading: editAboutUsLoading} = useMutation(editAbout);
    const isLoading = getaAboutUsLoading || editAboutUsLoading;


    const {
        control ,
        handleSubmit,
        register,
        getValues,
        formState: {errors}
    } = useForm<AboutUsDTO>({
        resolver: yupResolver(validationSchema),
        ...(about ? {
            values : {
                homePageDescription: {
                    am: about.homePageDescription.am,
                    ru: about.homePageDescription.ru
                },
                aboutUsPageDescriptionTop: {am: about.aboutUsPageDescriptionTop.am, ru: about.aboutUsPageDescriptionTop.ru },
                aboutUsPageDescriptionBottom: {am: about.aboutUsPageDescriptionBottom.am, ru: about.aboutUsPageDescriptionBottom.ru },
                image:about.image ? {
                    src: about.image.src,
                    id: about.image.id,
                    extension: about.image.extension,
                }: null,
                assortmentCount: about.assortmentCount,
                brandsCount: about.brandsCount,
                partnersCount:about.partnersCount,
            }
        }: {})
    });

    const onSubmit = async () => {
        editAboutUsMutate(getValues())
    }

    const submit = () => {
        handleSubmit((data) => {
            return onSubmit().then(() => router.push("/admin/main"))
        })()
    }

    return (
        <div className="xl:w-[60%] mx-auto w-full pb-16">
            {isLoading && <LoadingSpinner/>}
            <h1 className="text-xl mb-5">О нас</h1>
            <div className="mb-5">
                <ImageGallery className='max-w-[600px] mx-auto' imageHeightProportion={100} control={control} name='image'/>
            </div>
            <div className="mb-5">
                <TextArea
                    required
                    label="Главный текст на армянском"
                    placeholder='Введите заголовок'
                    {...register("homePageDescription.am")}
                    error={errors.homePageDescription?.am?.message}
                    className="min-h-[150px] mb-5"

                />
                <TextArea
                    required
                    label="Главный текст на русском"
                    placeholder='Введите описание'
                    {...register("homePageDescription.ru")}
                    error={errors.homePageDescription?.ru?.message}
                    className="min-h-[150px]"
                />
            </div>
            <div className="mb-5">
                <TextArea
                    required
                    label="Второй текст на армянском"
                    placeholder='Введите описание'
                    {...register("aboutUsPageDescriptionTop.am")}
                    error={errors.aboutUsPageDescriptionTop?.am?.message}
                    className="min-h-[150px] mb-5"
                />
                <TextArea
                    required
                    label="Второй текст на русском"
                    placeholder='Введите описание'
                    {...register("aboutUsPageDescriptionTop.ru")}
                    error={errors.aboutUsPageDescriptionTop?.ru?.message}
                    className="min-h-[150px]"
                />
            </div>
            <div className="mb-5">
                <TextArea
                    required
                    label="Третий текст на армянском"
                    placeholder='Введите описание'
                    {...register("aboutUsPageDescriptionBottom.am")}
                    error={errors.aboutUsPageDescriptionBottom?.am?.message}
                    className="min-h-[150px] mb-5"
                />
                <TextArea
                    required
                    label="Третий текст на русском"
                    placeholder='Введите описание'
                    {...register("aboutUsPageDescriptionBottom.ru")}
                    error={errors.aboutUsPageDescriptionBottom?.ru?.message}
                    className="min-h-[150px]"
                />
            </div>
            <div>
                <Input
                    {...register("assortmentCount")}
                    label="Количество ассортимента"
                    placeholder="количество ассортимента"
                    error={errors.assortmentCount?.message}
                    required={true}
                    className='w-full mb-3'
                    type="number"
                />
                <Input
                    {...register("brandsCount")}
                    label="Количество брендов"
                    placeholder="количество брендов"
                    error={errors.brandsCount?.message}
                    required={true}
                    className='w-full mb-3'
                    type="number"
                />
                <Input
                    {...register("partnersCount")}
                    label="Количество Партнеров"
                    placeholder="количество партнеров"
                    error={errors.partnersCount?.message}
                    required={true}
                    className='w-full mb-3'
                    type="number"
                />
            </div>
            <div className="fixed right-4 top-4 flex gap-2">
                <Link href="/admin/main">
                    <Button variant="secondary">Отмена</Button>
                </Link>
                <Button
                    variant="primary"
                    onClick={() => {
                        submit()
                    }}
                >
                    Сохранить
                </Button>

            </div>
        </div>
    )
}