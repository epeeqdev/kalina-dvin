import {useRouter} from "next/navigation";
import {useMutation} from "@/utils/hooks/useMutation";
import {addCategory} from "@/app/admin/main/categories/halpers/addCategory";
import {editCategory} from "@/app/admin/main/categories/halpers/editCategory";
import {deleteCategory} from "@/app/admin/main/categories/halpers/deleteCategory";
import {useState} from "react";
import {useQuery} from "@/utils/hooks/useQuery";
import {CategoryResponseDTO} from "@/backend/types";
import {getCategory} from "@/app/admin/main/categories/halpers/getCategory";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {log} from "util";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Input} from "@/components/controls/input";
import * as yup from "yup";
import {Button} from "../../components/controls/button";
import Alert from "@/app/admin/main/products/helpers/alert";
import {ImageUploader} from "@/app/admin/main/components/form-wrapped-controls/image-uploader";

import {PageLayout} from "@/app/admin/main/components/page-layout";


interface Prop {
    id?: string
}
export  const CategoryForm = ({id} : Prop) => {
    const router = useRouter()
    const {mutate: addCategoryMutate, isLoading : addCategoryLoading} = useMutation(addCategory);
    const {mutate: editCategoryMutate, isLoading: editCategoryLoading } = useMutation(editCategory);
    const {mutate: deleteCategoryMutate, isLoading: deleteCategoryLoading} = useMutation(deleteCategory);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const {data: category, isLoading: categoryLoading} = useQuery<CategoryResponseDTO>(() => getCategory(id), [], {fetchOnMount: !!id});

    const validationSchema = yup.object().shape({
        name: yup.object().shape({
            am: yup.string().required("Обязательное поле"),
            ru: yup.string().required("Обязательное поле"),
        }),
        image: yup.object().shape({id: yup.string(), src: yup.string()}).required("Изображение обязательно")
    })

    const isLoading = editCategoryLoading || addCategoryLoading || deleteCategoryLoading || categoryLoading

    const {
        control ,
        handleSubmit,
        register,
        getValues,
        formState: {errors, isDirty}
    } = useForm<CategoryResponseDTO>({
        resolver: yupResolver(validationSchema),
            values: {
                name: category ? category?.name : null,
                image: category ? category?.image : null,
                _id: category?._id
            }
    }) ?? {};

    const onCancel = () => {
        setDeleteModalOpen(false)
    }
    const onDelete = async () => {
        deleteCategoryMutate(id).then(() => router.push('/admin/main/categories')).catch((e) => log("cqatch error" , e));
    }


    const onSubmit = async () => {
        if (id) {
            editCategoryMutate(id, getValues()).then(() => router.push('/admin/main/categories'))
        } else {
            addCategoryMutate(getValues()).then((data) => router.push(`/admin/main/categories/edit/${data._id}`))
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
                <p className="text-2xl font-bold">Вы уверены, что хотите удалить данную категорию?</p>
                <p className="text-gray-700">После удаления категорию не возможно восстановить!</p>
            </Alert>
            {isLoading && <LoadingSpinner />}
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
                    <Button onClick={() => {
                            router.push('/admin/main/categories')
                    }} variant="secondary">Отмена</Button>
                    {isDirty && !isLoading && <Button variant="primary" onClick={submit}>Сохранить</Button>}
                </>
            } headerTitle={"Добавить категорию"}>
                <div className=" w-[100%] pl-5 pr-5 mb-20">
                    <div className="gap-4">
                        <ImageUploader error={errors.image?.message} control={control} name='image' imageHeightProportion={50}/>
                        <div className='flex-1'>
                            <Input
                                {...register("name.am")}
                                label="Название категории по АРМ"
                                placeholder="Название по АРМ"
                                error={errors.name?.am?.message}
                                required={true}
                                className='w-full mb-5'
                            />
                            <Input
                                {...register("name.ru")}
                                label="Название категории по РУС"
                                placeholder="Название по РУС"
                                error={errors.name?.ru?.message}
                                required={true}
                                className='w-full'
                            />
                        </div>
                    </div>

                </div>
            </PageLayout>
        </div>

    )
}