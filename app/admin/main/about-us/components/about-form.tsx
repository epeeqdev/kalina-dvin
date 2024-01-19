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
import {ABOUT, CANCEL_BUTTON, SAVE_BUTTON} from "../../costants";
import {REQUIRED_FIELD_TEXT, REQUIRED_IMAGE} from "../../../../../utils/form";

const validationSchema = yup.object().shape({
    homePageDescription: yup.object().shape({am: yup.string().required(REQUIRED_FIELD_TEXT), ru: yup.string().required(REQUIRED_FIELD_TEXT)}).required(""),
    aboutUsPageDescriptionTop: yup.object().shape({am: yup.string().required(REQUIRED_FIELD_TEXT), ru: yup.string().required(REQUIRED_FIELD_TEXT)}).required(""),
    aboutUsPageDescriptionBottom: yup.object().shape({am: yup.string().required(REQUIRED_FIELD_TEXT), ru: yup.string().required(REQUIRED_FIELD_TEXT)}).required(""),
    mainPageImage: yup.object().shape({id: yup.string().required(""), src: yup.string().required("") }).required(REQUIRED_IMAGE),
    aboutPageTopImage: yup.object().shape({id: yup.string().required(""), src: yup.string().required("")}).required(REQUIRED_IMAGE),
    aboutPageBottomImage: yup.object().shape({id: yup.string().required(""), src: yup.string().required("") }).required(REQUIRED_IMAGE),
    assortmentCount: yup.number().typeError(REQUIRED_FIELD_TEXT).test( val => val.toString().length >= 1),
    brandsCount: yup.number().typeError(REQUIRED_FIELD_TEXT).test( val => val.toString().length >= 1),
    partnersCount: yup.number().typeError(REQUIRED_FIELD_TEXT).test( val => val.toString().length >= 1),

})
export default function  AboutForm() {
    const router = useRouter()
    const {data: about, isLoading: getaAboutUsLoading} = useQuery<AboutUsDTO>(getAboutUs);
    const {mutate: editAboutUsMutate, isLoading: editAboutUsLoading} = useMutation(editAbout);
    const isLoading = getaAboutUsLoading || editAboutUsLoading;


    const {
        control ,
        handleSubmit,
        register,
        getValues,
        formState: {errors, isDirty}
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
                partnersCount: about.partnersCount,
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
                    <Button title={CANCEL_BUTTON} onClick={() => router.push("/admin/main")} variant="secondary"></Button>
                    {isDirty && !isLoading && <Button title={SAVE_BUTTON} variant="primary" onClick={submit}></Button>}
                    <Link href={"/main#about-us-part"} target="_blank">
                        <ToItemPageButton/>
                    </Link>
                </>
            } headerTitle={ABOUT}
            >
                <div className="w-full pb-16 pl-5 pr-8">
                        <div className="my-5">
                            <ImageUploader
                                label={{am: "Գլխավոր էջի լուսանկար" ,ru: "Фото Главной страницы"}}
                                className='max-w-[600px]'
                                imageHeightProportion={100}
                                control={control}
                                name='mainPageImage'
                                error={errors.mainPageImage}
                            />
                        </div>
                    <div className="mb-5">
                        <TextArea
                            required
                            label={{am: "Հիմնական տեքստը ՀԱՅ" ,ru: "Главный текст на АРМ"}}
                            placeholder={{am: "Մուտքագրեք տեքստը", ru: 'Введите текст'}}
                            {...register("homePageDescription.am")}
                            error={errors.homePageDescription?.am}

                        />
                        <TextArea
                            required
                            label={{am: "Հիմնական տեքստը ՌՈՒՍ" ,ru: "Главный текст на РУС"}}
                            placeholder={{am: "Մուտքագրեք տեքստը", ru: 'Введите текст'}}
                            {...register("homePageDescription.ru")}
                            error={errors.homePageDescription?.ru}
                        />
                    </div>
                    <div className="my-5">
                        <ImageUploader
                            label={{am: "Վերևի Մեր մասին հատվածի լուսանկար" ,ru: "Верхний фото страницы О нас"}}
                            className='max-w-[600px]'
                            imageHeightProportion={100}
                            control={control}
                            name='aboutPageTopImage'
                            error={errors.aboutPageTopImage}
                        />
                    </div>
                    <div className="mb-5">
                        <TextArea
                            required
                            label={{am: "Վերևի տեքստը ՀԱՅ" ,ru: "Верхний текст на АРМ"}}
                            placeholder={{am: "Մուտքագրեք տեքստը", ru: 'Введите текст'}}
                            {...register("aboutUsPageDescriptionTop.am")}
                            error={errors.aboutUsPageDescriptionTop?.am}
                        />
                        <TextArea
                            required
                            label={{am: "Վերևի տեքստը ՌՈՒՍ" ,ru: "Верхний текст на РУС"}}
                            placeholder={{am: "Մուտքագրեք տեքստը", ru: 'Введите текст'}}
                            {...register("aboutUsPageDescriptionTop.ru")}
                            error={errors.aboutUsPageDescriptionTop?.ru}
                        />
                    </div>
                    <div className="my-5">
                        <ImageUploader
                            label={{am: "Ներգևի Մեր մասին հատվածի լուսանկար" ,ru: "Нижнее фото страницы О нас"}}
                            className='max-w-[600px]'
                            imageHeightProportion={100}
                            control={control}
                            name='aboutPageBottomImage'
                            error={errors.aboutPageBottomImage}
                        />
                    </div>
                    <div className="mb-5">
                        <TextArea
                            required
                            label={{am: "Ներգևի տեքստը ՀԱՅ" ,ru: "Нижний текст на АРМ"}}
                            placeholder={{am: "Մուտքագրեք տեքստը", ru: 'Введите текст'}}
                            {...register("aboutUsPageDescriptionBottom.am")}
                            error={errors.aboutUsPageDescriptionBottom?.am}
                        />
                        <TextArea
                            required
                            label={{am: "Ներգևի տեքստը ՌՈՒՍ" ,ru: "Нижний текст на РУС"}}
                            placeholder={{am: "Մուտքագրեք տեքստը", ru: 'Введите текст'}}
                            {...register("aboutUsPageDescriptionBottom.ru")}
                            error={errors.aboutUsPageDescriptionBottom?.ru}
                        />
                    </div>
                    <div>
                        <Input
                            {...register("assortmentCount")}
                            label={{am: "Տեսականու քանակը" ,ru: "Количество ассортимента"}}
                            placeholder={{am: "Տեսականու քանակը", ru: 'Количество ассортимента'}}
                            error={errors.assortmentCount}
                            required={true}
                            className='w-full mb-3'
                            type="number"
                        />
                        <Input
                            {...register("brandsCount")}
                            label={{am: "Բրենդների քանակը" ,ru: "Количество брендов"}}
                            placeholder={{am: "Բրենդների քանակը", ru: 'Количество брендов'}}
                            error={errors.brandsCount}
                            required={true}
                            className='w-full mb-3'
                            type="number"
                        />
                        <Input
                            {...register("partnersCount")}
                            label={{am: "Գործընկերների քանակը" ,ru: "Количество Партнеров"}}
                            placeholder={{am: "Գործընկերների քանակը", ru: 'Количество Партнеров'}}
                            error={errors.partnersCount}
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