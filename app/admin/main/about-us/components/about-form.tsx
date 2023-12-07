'use client'

import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {TextArea} from "@/components/controls/text-area";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {Button} from "../../components/controls/button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {editAbout} from "@/app/admin/main/about-us/helpers/editAboutUsContent";
import {AboutUsDTO} from "@/backend/types";
import {Input} from "@/components/controls/input";
import {ImageUploader} from "@/app/admin/main/components/form-wrapped-controls/image-uploader";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {getAboutUs} from "../helpers/getAboutUs";
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";
import Link from "next/link";

const validationSchema = yup.object().shape({
    homePageDescription: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}).required(""),
    aboutUsPageDescriptionTop: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}).required(""),
    aboutUsPageDescriptionBottom: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}).required(""),
    mainPageImage: yup.object().shape({id: yup.string().required(""), src: yup.string().required("") }).nullable(),
    aboutPageTopImage: yup.object().shape({id: yup.string().required(""), src: yup.string().required("") }).nullable(),
    aboutPageBottomImage: yup.object().shape({id: yup.string().required(""), src: yup.string().required("") }).nullable(),
    assortmentCount: yup.number().required("Обязательное поле"),
    brandsCount: yup.number().required("Обязательное поле"),
    partnersCount: yup.number().required("Обязательное поле"),

})
export default function AboutForm() {
    const router = useRouter()
    const {data: about, isLoading: getaAboutUsLoading} = useQuery<AboutUsDTO>(getAboutUs);
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
                mainPageImage:about.mainPageImage || null,
                aboutPageTopImage: about.aboutPageTopImage,
                aboutPageBottomImage: about.aboutPageBottomImage,
                assortmentCount: about.assortmentCount,
                brandsCount: about.brandsCount,
                partnersCount:about.partnersCount,
            }
        }: {})
    });

    const onSubmit = async () => {
        editAboutUsMutate(getValues()).then(() => router.push("/admin/main"))
    }

    const submit = () => {
        handleSubmit((data) => {
            return onSubmit()
        })()
    }

    return (
        <div>
            {isLoading && <LoadingSpinner/>}
            <PageLayout headerButtons={
                <>
                    <Button onClick={() => router.push("/admin/main")} variant="secondary">Отмена</Button>
                    <Button variant="primary" onClick={submit}>Сохранить</Button>
                    <Link href={"/main#about-us-part"} target="_blank">
                        <ToItemPageButton/>
                    </Link>
                </>
            } headerTitle={"О нас"}
            >
                <div className="w-full pb-16 pl-5 pr-8">
                        <div className="my-5 flex justify-start">
                            <ImageUploader
                                label="Фото Главной страницы"
                                className='max-w-[600px]'
                                imageHeightProportion={100}
                                control={control}
                                name='mainPageImage'/>
                        </div>
                    <div className="mb-5">
                        <TextArea
                            required
                            label="Главный текст на армянском"
                            placeholder='Введите заголовок'
                            {...register("homePageDescription.am")}
                            error={errors.homePageDescription?.am?.message}
                            className="mb-5"

                        />
                        <TextArea
                            required
                            label="Главный текст на русском"
                            placeholder='Введите описание'
                            {...register("homePageDescription.ru")}
                            error={errors.homePageDescription?.ru?.message}
                        />
                    </div>
                    <div className="my-5 flex justify-start">
                        <ImageUploader label="Верхнее фото страницы О нас" className='max-w-[600px]' imageHeightProportion={100} control={control} name='aboutPageTopImage'/>
                    </div>
                    <div className="mb-5">
                        <TextArea
                            required
                            label="Верхний текст на армянском"
                            placeholder='Введите описание'
                            {...register("aboutUsPageDescriptionTop.am")}
                            error={errors.aboutUsPageDescriptionTop?.am?.message}
                            className="mb-5"
                        />
                        <TextArea
                            required
                            label="Верхний текст на русском"
                            placeholder='Введите описание'
                            {...register("aboutUsPageDescriptionTop.ru")}
                            error={errors.aboutUsPageDescriptionTop?.ru?.message}
                        />
                    </div>
                    <div className="my-5 flex justify-start">
                        <ImageUploader label="Нижнее фото страницы О нас" className='max-w-[600px]' imageHeightProportion={100} control={control} name='aboutPageBottomImage'/>
                    </div>
                    <div className="mb-5">
                        <TextArea
                            required
                            label="Нижний текст на армянском"
                            placeholder='Введите описание'
                            {...register("aboutUsPageDescriptionBottom.am")}
                            error={errors.aboutUsPageDescriptionBottom?.am?.message}
                            className="mb-5"
                        />
                        <TextArea
                            required
                            label="Нижний текст на русском"
                            placeholder='Введите описание'
                            {...register("aboutUsPageDescriptionBottom.ru")}
                            error={errors.aboutUsPageDescriptionBottom?.ru?.message}
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
                </div>
            </PageLayout>
            </div>

    )
}