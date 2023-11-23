'use client'

import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/controls/loading-spinner";
import axios from "@/axios";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {Button} from "../../components/controls/button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ContactsPageDTO} from "@/backend/types";
import {Input} from "@/components/controls/input";
import {editContacts} from "@/app/admin/main/contacts/helpers/edit-contacts";
import {PageLayout} from "@/app/admin/main/components/page-layout";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = yup.object().shape({
    phone: yup.string().matches(phoneRegExp,'Номер телефона, должно быть в формате +374(XX)-XX-XX-XX').min(11).required("Обязательное поле"),
    email: yup.string().email("Укажите корректную эл. почту").required("Обязательное поле"),
    address: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}),
    socialLinks: yup.object().shape({instagram: yup.string().url("Укажите корректную ссылку").required("Обязательное поле"), facebook: yup.string().url("Укажите корректную ссылку").required("Обязательное поле")})

})
export default function ContactsForm() {
    const router = useRouter()
    const {data: contacts, isLoading: getaContactsLoading} = useQuery<ContactsPageDTO>(() => axios.get(`/api/pages/contacts`));
    const {mutate: editContactsUsMutate, isLoading: editContactsUsLoading} = useMutation(editContacts);
    const isLoading = getaContactsLoading || editContactsUsLoading;


    const {
        handleSubmit,
        register,
        getValues,
        formState: {errors}
    } = useForm<ContactsPageDTO>({
        resolver: yupResolver(validationSchema),
        ...(contacts ? {
            values : {
                phone: contacts.phone,
                email: contacts.email,
                address: {
                    am: contacts.address.am,
                    ru: contacts.address.ru
                },
                socialLinks: {
                    facebook : contacts.socialLinks.facebook,
                    instagram: contacts.socialLinks.instagram
                }
            }
        }: {})
    });

    const onSubmit = async () => {
        await editContactsUsMutate(getValues())
    }

    const submit = () => {
        handleSubmit((data) => {
            router.push("/admin/main")
            return onSubmit()
        })()
    }

    return (
        <div className="mx-auto w-full pb-16">
            {isLoading && <LoadingSpinner/>}

            <PageLayout headerButtons={
                <>
                    <Button className="h-[40px]" onClick={() => router.push("/admin/main")} variant="secondary">Отмена</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            submit()
                        }}
                        className="h-[40px]"
                    >
                        Сохранить
                    </Button>
                </>
            } headerTitle={"Контактная информация"}
            >
                <div className="px-5">
                    <div className="mb-5">
                        <Input
                            {...register("phone")}
                            label="Телефон"
                            placeholder="374(XX)XXXXXX"
                            error={errors.phone?.message}
                            required={true}
                            className='w-full mb-3'
                        />
                    </div>
                    <div className="mb-5">
                        <Input
                            {...register("email")}
                            label="Эл. почта"
                            placeholder="email"
                            error={errors.email?.message}
                            required={true}
                            className='w-full mb-3'
                        />
                    </div>
                    <div className="mb-5">
                        <Input
                            {...register("address.am")}
                            label="Адрес"
                            placeholder="Адрес"
                            error={errors.address?.am?.message}
                            required={true}
                            className='w-full mb-3'
                            type="string"
                        />
                        <Input
                            {...register("address.ru")}
                            label="Адрес"
                            placeholder="Адрес"
                            error={errors.address?.ru?.message}
                            required={true}
                            className='w-full mb-3'
                            type="string"
                        />
                    </div>
                    <div>
                        <Input
                            {...register("socialLinks.facebook")}
                            label="Ссылка на Facebook"
                            placeholder="Ссылка"
                            error={errors.socialLinks?.facebook?.message}
                            required={true}
                            className='w-full mb-3'
                            type="string"
                        />
                        <Input
                            {...register("socialLinks.instagram")}
                            label="Ссылка на Instgram"
                            placeholder="Ссылка"
                            error={errors.socialLinks?.instagram?.message}
                            required={true}
                            className='w-full mb-3'
                            type="string"
                        />
                    </div>
                </div>
            </PageLayout>
        </div>
    )
}