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
import {getAttribute} from "@/app/admin/main/attributes/halpers/grtAttributes";
import {AttributeDTO} from "@/backend/types";
import {PageLayout} from "@/app/admin/main/components/page-layout";

interface Props {
    id?: string
}
const validationSchema = yup.object().shape({
    name: yup.object().shape({
        am: yup.string().required("Обязательное поле"),
        ru: yup.string().required("Обязательное поле"),
    }),
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

    const loading = editAttributeLoading || addAttributeLoading || deleteAttributeLoading || attributeLoading

    const {
        handleSubmit,
        register,
        getValues,
        formState: {errors}
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
            <Alert onCancel={onCancel} onClose={onCancel} onAccept={onDelete} isOpen={deleteModalOpen}>
                <p className="text-2xl font-bold">Вы уверены, что хотите удалить данный атрибут?</p>
                <p className="text-gray-700">После удаления атрибут не возможно восстановить!</p>
            </Alert>
            {loading && <LoadingSpinner />}
            <PageLayout headerButtons={
                <>
                    {
                        id
                            ?
                            <Button variant="alert" onClick={() => {
                                setDeleteModalOpen(true)
                            }}>Удалить</Button>
                            : <></>
                    }
                    <Button onClick={() => router.push("/admin/main/attributes")} variant="secondary">Отмена</Button>
                    <Button variant="primary" onClick={submit}>Сохранить</Button>
                </>
            } headerTitle={"Добавить Атрибуты"} >
                <div className="flex gap-4 px-5">
                    <div className='flex-1'>
                        <Input
                            {...register("name.am")}
                            label="Название атрибута по АРМ"
                            placeholder="Название по АРМ"
                            error={errors.name?.am?.message}
                            required={true}
                            className='w-full mt-5'
                        />
                        <Input
                            {...register("name.ru")}
                            label="Название атрибута по РУС"
                            placeholder="Название по РУС"
                            error={errors.name?.ru?.message}
                            required={true}
                            className='w-full mt-5'
                        />
                    </div>
                </div>
            </PageLayout>
        </div>

    )
}