import {useRouter} from "next/navigation";
import {useMutation} from "@/utils/hooks/useMutation";
import {addAttribute} from "@/app/admin/main/attributes/halpers/addAttribute";
import {editAttribute} from "@/app/admin/main/attributes/halpers/editAttribute";
import {deleteAttribute} from "@/app/admin/main/attributes/halpers/deleteAttribute";
import {useState} from "react";
import {useQuery} from "@/utils/hooks/useQuery";
import {AttributeResponseDTO} from "@/backend/types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import DeleteConfirmationModal from "@/app/admin/main/products/helpers/deleteProductModal";
import LoadingSpinner from "@/components/controls/loading-spinner";
import Link from "next/link";
import {Input} from "@/components/controls/input";
import * as yup from "yup";
import {Button} from "../../components/controls/button";
import {getAttribute} from "@/app/admin/main/attributes/halpers/grtAttributes";

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
    const {data: attributeResponse, isLoading: attributeLoading} = useQuery<AttributeResponseDTO[]>(getAttribute,[id], {fetchOnMount: !!id});

    const attribute = attributeResponse
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
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onDelete={onDelete}
                onClose={onCancel}
                title="Вы уверены, что хотите удалить данный атрибут?"
                message="После удаления атрибут не возможно восстановить!"
            />
            {loading && <LoadingSpinner />}
            <div className={"flex justify-end mb-5 gap-2"}>
                {
                    id
                        ?
                        <Button variant="alert" onClick={() => {
                            setDeleteModalOpen(true)
                        }}>Удалить</Button>
                        : <></>
                }
                <Link href="/admin/main/attributes">
                    <Button variant="secondary">Отмена</Button>
                </Link>
                <Button variant="primary" onClick={submit}>Сохранить</Button>
            </div>
            <div className="xl:w-[60%] mx-auto w-full col-auto">
                <div className="text-3xl mb-10">Добавить Атрибуты</div>
                <div className="flex gap-4">
                    <div className='flex-1'>
                        <Input
                            {...register("name.am")}
                            label="Название атрибута по АРМ"
                            placeholder="Название по АРМ"
                            error={errors.name?.am?.message}
                            required={true}
                            className='w-full mb-3'
                        />
                        <Input
                            {...register("name.ru")}
                            label="Название атрибута по РУС"
                            placeholder="Название по РУС"
                            error={errors.name?.ru?.message}
                            required={true}
                            className='w-full'
                        />
                    </div>
                </div>

            </div>
        </div>

    )
}