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
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";
import Link from "next/link";
import {CANCEL_BUTTON, CONTACTS, SAVE_BUTTON} from "../../costants";
import {REQUIRED_EMAIL_FIELD_TEXT, REQUIRED_FIELD_TEXT} from "../../../../../utils/form";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = yup.object().shape({
    phone: yup.string()
        .matches(phoneRegExp, {
            message: {
                am: "Հեռախոսահամարը պետք է լինի 374(XX) XX-XX-XX ձևաչափով",
                ru: 'Номер телефона, должно быть в формате 374(XX) XX-XX-XX'
            }})
        .max(11, {am: "առավելագւյն թվանշանների քանակը 11", ru: "Максимальное количество чисел 11"})
        .required(REQUIRED_FIELD_TEXT),
    email: yup.string().email(REQUIRED_EMAIL_FIELD_TEXT).required(REQUIRED_FIELD_TEXT),
    address: yup.object().shape({
        am: yup.string().required(REQUIRED_FIELD_TEXT),
        ru: yup.string().required(REQUIRED_FIELD_TEXT)
    }),
    socialLinks: yup.object().shape({
        instagram: yup.string().url(REQUIRED_EMAIL_FIELD_TEXT).required(REQUIRED_FIELD_TEXT),
        facebook: yup.string().url(REQUIRED_EMAIL_FIELD_TEXT).required(REQUIRED_FIELD_TEXT)
    })

})
export default function ContactsForm() {
    const router = useRouter()
    const {
        data: contacts,
        isLoading: getaContactsLoading
    } = useQuery<ContactsPageDTO>(() => axios.get(`/api/pages/contacts`));
    const {mutate: editContactsUsMutate, isLoading: editContactsUsLoading} = useMutation(editContacts);
    const isLoading = getaContactsLoading || editContactsUsLoading;


    const {
        handleSubmit,
        register,
        getValues,
        formState: {errors, isDirty}
    } = useForm<ContactsPageDTO>({
        resolver: yupResolver(validationSchema),
        ...(contacts ? {
            values: {
                phone: contacts.phone,
                email: contacts.email,
                address: {
                    am: contacts.address.am,
                    ru: contacts.address.ru
                },
                socialLinks: {
                    facebook: contacts.socialLinks.facebook,
                    instagram: contacts.socialLinks.instagram
                }
            }
        } : {})
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
                    <Button title={CANCEL_BUTTON} onClick={() => router.push("/admin/main")} variant="secondary"></Button>
                    {isDirty && !isLoading && <Button title={SAVE_BUTTON} variant="primary" onClick={submit}></Button>}
                    <Link href={"/main#footer-part"} target="_blank">
                        <ToItemPageButton/>
                    </Link>
                </>
            } headerTitle={CONTACTS}
            >
                <div className="px-5">
                    <div className="mb-5">
                        <Input
                            {...register("phone")}
                            label={{am: "Հեռախոս" ,ru: "Телефон"}}
                            placeholder={{am: "374(XX)XXXXXX" ,ru: "374(XX)XXXXXX"}}
                            error={errors.phone}
                            required={true}
                            className='w-full mb-3'
                        />
                    </div>
                    <div className="mb-5">
                        <Input
                            {...register("email")}
                            label={{am: "Էլ․ փոստ" ,ru: "Эл. почта"}}
                            placeholder={{am: "Էլ․ փոստ" ,ru: "Эл. почта"}}
                            error={errors.email}
                            required={true}
                            className='w-full mb-3'
                        />
                    </div>
                    <div className="mb-5">
                        <Input
                            {...register("address.am")}
                            label={{am: "Հասցե ՀԱՅ" ,ru: "Адрес АРМ"}}
                            placeholder={{am: "Հասցե ՀԱՅ" ,ru: "Адрес АРМ"}}
                            error={errors.address?.am}
                            required={true}
                            className='w-full mb-3'
                            type="string"
                        />
                        <Input
                            {...register("address.ru")}
                            label={{am: "Հասցե ՌՈՒՍ" ,ru: "Адрес РУС"}}
                            placeholder={{am: "Հասցե ՌՈՒՍ" ,ru: "Адрес РУС"}}
                            error={errors.address?.ru}
                            required={true}
                            className='w-full mb-3'
                            type="string"
                        />
                    </div>
                    <div>
                        <Input
                            {...register("socialLinks.facebook")}
                            label={{am: "Ֆեյսբուքյան էջի հղում" ,ru: "Ссылка на Facebook"}}
                            placeholder={{am: "Հասցե" ,ru: "Ссылка"}}
                            error={errors.socialLinks?.facebook}
                            required={true}
                            className='w-full mb-3'
                            type="string"
                        />
                        <Input
                            {...register("socialLinks.instagram")}
                            label={{am: "Ինստագրամյան էջի հղում" ,ru: "Ссылка на Instagram"}}
                            placeholder={{am: "Հասցե" ,ru: "Ссылка"}}
                            error={errors.socialLinks?.instagram}
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