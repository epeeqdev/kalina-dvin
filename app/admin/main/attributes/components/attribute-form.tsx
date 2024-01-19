import {useRouter} from "next/navigation";
import {useMutation} from "@/utils/hooks/useMutation";
import {addAttribute} from "@/app/admin/main/attributes/halpers/addAttribute";
import {editAttribute} from "@/app/admin/main/attributes/halpers/editAttribute";
import {deleteAttribute} from "@/app/admin/main/attributes/halpers/deleteAttribute";
import {useState} from "react";
import {useQuery} from "@/utils/hooks/useQuery";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Alert from "@/app/admin/main/products/helpers/alert";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Input} from "@/components/controls/input";
import * as yup from "yup";
import {Button} from "../../components/controls/button";
import {getAttribute} from "@/app/admin/main/attributes/halpers/getAttribute";
import {AttributeDTO} from "@/backend/types";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {ADD_ATTRIBUTES, CANCEL_BUTTON, DELETE_BUTTON, SAVE_BUTTON} from "../../costants";
import {REQUIRED_FIELD_TEXT} from "@/utils/form";
import {useLanguage} from "@/app/main/hooks/useLanguage";

interface Props {
    id?: string
}
const validationSchema = yup.object().shape({
    name: yup.object().shape({
        am: yup.string().required(REQUIRED_FIELD_TEXT),
        ru: yup.string().required(REQUIRED_FIELD_TEXT),
    }) ,
})

interface Attribute {
    name: {
        am: string,
        ru: string
    }
}
export const AttributeForm = ({id}:Props) => {
    const router = useRouter()
    const {mutate: addAttributeMutate, isLoading : addAttributeLoading} = useMutation(addAttribute);
    const {mutate: editAttributeMutate, isLoading: editAttributeLoading } = useMutation(editAttribute);
    const {mutate: deleteAttributeMutate, isLoading: deleteAttributeLoading} = useMutation(deleteAttribute);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const {data: attribute, isLoading: attributeLoading} = useQuery<AttributeDTO>(getAttribute,[id], {fetchOnMount: !!id});
    const {getLanguage} = useLanguage();

    const isLoading = editAttributeLoading || addAttributeLoading || deleteAttributeLoading || attributeLoading

    const {
        handleSubmit,
        register,
        getValues,
        formState: {errors, isDirty}
    } = useForm<Attribute>({
        resolver: yupResolver(validationSchema),
        ...(attribute ? {
            values: {
                name: {
                    am: attribute?.name?.am,
                    ru: attribute?.name?.ru
                }
            }

        }: {})
    }) ?? {};


    const onCancel = () => {
        setDeleteModalOpen(false)
    }
    const onDelete = async () => {
        deleteAttributeMutate(id).then(() => router.push('/admin/main/attributes')).catch((e) => console.log("catch error" , e));
    }


    const onSubmit = async () => {
        if (id) {
            editAttributeMutate(id, getValues()).then(() => router.push('/admin/main/attributes'))
        } else {
            addAttributeMutate(getValues()).then(() => router.push('/admin/main/attributes'))
        }
    }

    const submit = () => {
        handleSubmit(() => {
            onSubmit()
        })()
    }

    return (
        <div>
            <Alert title={{am: "Ջնջել ատրիբուտը", ru: "Удалить Атрибут ?"}} onCancel={onCancel} onClose={onCancel} onAccept={onDelete} isOpen={deleteModalOpen}>
                <p className="text-2xl font-bold ">
                    {getLanguage({
                    am: "Դուք վստահ եք որ ուզում եք ջնջել այս ատրիբուտը",
                    ru: "Вы уверены, что хотите удалить данный атрибут?"
                })}</p>
                <p className="text-gray-700">
                    {getLanguage({
                    am: "Ջնջվելուց հետո հնարավոր չէ վերականգնել",
                    ru: "После удаления атрибут не возможно восстановить!"
                })}
                </p>

            </Alert>
            {isLoading && <LoadingSpinner />}
            <PageLayout headerButtons={
                <>
                    {
                        id
                            ?
                            <Button title={DELETE_BUTTON} variant="alert" onClick={() => {
                                setDeleteModalOpen(true)
                            }}></Button>
                            : <></>
                    }
                    <Button title={CANCEL_BUTTON} onClick={() => router.push("/admin/main/attributes")} variant="secondary"></Button>
                    {isDirty && !isLoading && <Button title={SAVE_BUTTON} variant="primary" onClick={submit}></Button>}
                </>
            } headerTitle={ADD_ATTRIBUTES}>
                <div className="flex gap-4 px-5">
                    <div className='flex-1'>
                        <Input
                            {...register("name.am")}
                            label={{am: "Ատրիբուտի անվանումը ՀԱՅ" ,ru: "Название атрибута по АРМ"}}
                            placeholder={{am: "Ատրիբուտի անվանումը ՀԱՅ" ,ru: "Название атрибута по АРМ"}}
                            error={errors.name?.am}
                            required={true}
                            className='w-full mt-5'
                        />
                        <Input
                            {...register("name.ru")}
                            label={{am: "Ատրիբուտի անվանումը ՌՈՒՍ" ,ru: "Название атрибута по РУС"}}
                            placeholder={{am: "Ատրիբուտի անվանումը ՌՈՒՍ" ,ru: "Название атрибута по РУС"}}
                            error={errors.name?.ru}
                            required={true}
                            className='w-full mt-5'
                        />
                    </div>
                </div>
            </PageLayout>
        </div>

    )
}