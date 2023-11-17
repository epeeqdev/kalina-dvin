'use client'

import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/controls/loading-spinner";
import axios from "@/axios";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import Link from "next/link";
import {Button} from "../../components/controls/button";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ContactsPageDTO} from "@/backend/types";
import {Input} from "@/components/controls/input";
import {editContacts} from "@/app/admin/main/contacts/helpers/edit-contacts";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = yup.object().shape({
    phone: yup.string().matches(phoneRegExp,'Номер телефона, должно быть в формате +374(XXX)-XX-XX-XX').min(11).required("Обязательное поле"),
    email: yup.string().required("Обязательное поле"),
    address: yup.object().shape({am: yup.string().required("Обязательное поле"), ru: yup.string().required("Обязательное поле")}),
    socialLinks: yup.object().shape({instagram: yup.string().required("Обязательное поле"), facebook: yup.string().required("Обязательное поле")})

})
export default function ContactsForm() {
    const router = useRouter()
    const {data: contacts, isLoading: getaContactsLoading} = useQuery<ContactsPageDTO>(() => axios.get(`/api/pages/contacts`));
    const {mutate: editContactsUsMutate, isLoading: editContactsUsLoading} = useMutation(editContacts);
    const isLoading = getaContactsLoading || editContactsUsLoading;


    const {
        control ,
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
        <div className="xl:w-[60%] mx-auto w-full pb-16">
            {isLoading && <LoadingSpinner/>}
            <h1 className="text-xl mb-5">Контактная информация</h1>
            <div className="mb-5">
                <Input
                    {...register("phone")}
                    label="телефон"
                    placeholder="телефон"
                    error={errors.phone?.message}
                    required={true}
                    className='w-full mb-3'
                />
            </div>
            <div className="mb-5">
                <Input
                    {...register("email")}
                    label="email"
                    placeholder="email"
                    error={errors.email?.message}
                    required={true}
                    className='w-full mb-3'
                />
            </div>
            <div className="mb-5">
                <Input
                    {...register("address.am")}
                    label="адрес"
                    placeholder="адрес"
                    error={errors.address?.am?.message}
                    required={true}
                    className='w-full mb-3'
                    type="string"
                />
                <Input
                    {...register("address.ru")}
                    label="адрес"
                    placeholder="адрес"
                    error={errors.address?.ru?.message}
                    required={true}
                    className='w-full mb-3'
                    type="string"
                />
            </div>
            <div>
                <Input
                    {...register("socialLinks.facebook")}
                    label="Facebook"
                    placeholder="ссылка"
                    error={errors.socialLinks?.facebook?.message}
                    required={true}
                    className='w-full mb-3'
                    type="string"
                />
                <Input
                    {...register("socialLinks.instagram")}
                    label="Instgram"
                    placeholder="ссылка"
                    error={errors.socialLinks?.instagram?.message}
                    required={true}
                    className='w-full mb-3'
                    type="string"
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