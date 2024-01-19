import Alert from "@/app/admin/main/products/helpers/alert";
import {Input} from "@/components/controls/input";
import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ADD_BUTTON, CANCEL_BUTTON} from "@/app/admin/main/costants";

interface FormFields {
    uploadUrl?:string
}
const validationSchema = yup.object().shape({
    uploadUrl: yup.string().url('Укажите корректную ссылку').required('Введите ссылку на изображение')
})
interface Props {
    isOpen?:boolean;
    onClose?: () => void;
    onSubmit: (url:string) => void
}
export const UrlUploadModal = ({isOpen,onClose = () => null, onSubmit }:Props) => {
    const {register, reset, formState: {errors}, handleSubmit} = useForm<FormFields>({
        values: {
            uploadUrl: '',
        },
        resolver: yupResolver(validationSchema)
    })
    const onAccept = () => {
        handleSubmit((data: FormFields) => {
            onSubmit(data?.uploadUrl);
            handleClose()
        })()
    }
    const handleClose = () => {
        reset()
        onClose();
    }
    return (
        <Alert title={{am: "Պատկերի վերբեռնում" ,ru: 'Загрузка изображения'}} isOpen={isOpen} acceptButtonLabel={ADD_BUTTON} cancelButtonLabel={CANCEL_BUTTON} onAccept={onAccept} onClose={handleClose} onCancel={handleClose}>
            <Input error={errors?.uploadUrl?.message} {...register('uploadUrl')} label={{am: "Հղում" ,ru: 'Ссылка'}}/>
        </Alert>
    )
}