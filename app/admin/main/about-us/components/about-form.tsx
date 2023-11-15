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
import {AboutUs, addAbout} from "@/app/admin/main/about-us/helpers/addAboutUsContent";
import {deleteAbout} from "@/app/admin/main/about-us/helpers/deleteAbout";
import Modal from "@/app/admin/main/products/helpers/modal";
import Alert from "@/app/admin/main/products/helpers/alert";

const validationSchema = yup.object().shape({
    mainPage: yup.object().shape({
        am: yup.string().required("Обязательное поле"),
        ru: yup.string().required("Обязательное поле"),
    }),
    aboutUsPage: yup.object().shape({
        top:yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}),
        bottom: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")})
    }),
    image: yup.object().shape({extension: yup.string(), id: yup.string(), src: yup.string() }).nullable()

})
export default function AboutForm({id}: { id: string }) {
    const router = useRouter()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const {data: aboutResponse, isLoading: aboutLoading} = useQuery<AboutUs[]>(() => axios.get(`/api/about`));
    const {mutate: deleteProductMutate, isLoading: deleteLoading} = useMutation(deleteAbout);
    const {mutate: AboutMutate, isLoading: addAboutLoading} = useMutation(addAbout);
    const isLoading = aboutLoading || deleteLoading || addAboutLoading;

    const about = null;

    const {
        control ,
        handleSubmit,
        register,
        getValues,
        formState: {errors}
    } = useForm<AboutUs>({
        resolver: yupResolver(validationSchema),
        ...(about ? {
            values : {
                mainPage: {
                    am: about.mainPage.am, 
                    ru: about.mainPage.ru
                },
                aboutUsPage: {
                    top: {am: about.aboutUsPage.top.am, ru: about.aboutUsPage.top.ru},
                    bottom: {am: about.aboutUsPage.bottom.am, ru: about.aboutUsPage.bottom.ru}
                },
                image:{
                    src: about.image.src,
                    id: about.iamge.id,
                    extension: about.iamge.extension,
                }
            }
        }: {})
    });

    const onSubmit = async () => {
        if (id) {

        } else {
            // return addAboutMutate(getValues())
        }
    }

    const submit = () => {
        handleSubmit((data) => {
            console.log('data',data)
            // return onSubmit()
        })()
    }

    const onDelete = async () => {
        deleteProductMutate(id).then(() => router.push('/admin/main/products'))
    }

    return (
        <div className="xl:w-[60%] mx-auto w-full pb-16">
            {isLoading && <LoadingSpinner/>}
            <h1 className="text-xl mb-5">{id ? "Редактировать продукт" : "Добавить продукт"}</h1>
            <div className="mb-5">
                <ImageGallery control={control} name='images'/>
            </div>
            <div className="mb-5">
                <TextArea
                    required
                    label="Главный текст на армянском"
                    placeholder='Введите заголовок'
                    {...register("mainPage.am")}
                    error={errors.mainPage?.am?.message}
                />
                <TextArea
                    required
                    label="Главный текст на русском"
                    placeholder='Введите описание'
                    {...register("mainPage.ru")}
                    error={errors.mainPage?.ru?.message}
                />
            </div>
            <div className="mb-5">
                <TextArea
                    required
                    label="Второй текст на армянском"
                    placeholder='Введите описание'
                    {...register("aboutUsPage.top.am")}
                    error={errors.aboutUsPage?.top?.am?.message}
                />
                <TextArea
                    required
                    label="Второй текст на русском"
                    placeholder='Введите описание'
                    {...register("aboutUsPage.top.ru")}
                    error={errors.aboutUsPage?.top?.ru?.message}
                />
            </div>
            <div className="mb-5">
                <TextArea
                    required
                    label="Третий текст на армянском"
                    placeholder='Введите описание'
                    {...register("aboutUsPage.bottom.am")}
                    error={errors.aboutUsPage?.bottom?.am?.message}
                />
                <TextArea
                    required
                    label="Третий текст на русском"
                    placeholder='Введите описание'
                    {...register("aboutUsPage.bottom.ru")}
                    error={errors.aboutUsPage?.bottom?.ru?.message}
                />
            </div>
            <div className="fixed right-4 top-4 flex gap-2">
                {
                    id
                        ?
                        <Button
                            variant="alert"
                            onClick={() => {
                                setDeleteModalOpen(true)
                            }}>Удалить</Button>
                        : <></>
                }
                <Link href="/admin/main">
                    <Button variant="secondary">Отмена</Button>
                </Link>
                <Button
                    variant="primary"
                    onClick={submit}
                >
                    Сохранить
                </Button>

            </div>
            <Alert
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onCancel={() => setDeleteModalOpen(false)}
                onAccept={onDelete}>
                Вы уверены, что хотите удалить данный продукт?
                После удаления продукт не возможно восстановить!
            </Alert>
        </div>
    )
}