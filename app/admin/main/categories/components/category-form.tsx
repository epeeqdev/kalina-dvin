import {useRouter} from "next/navigation";
import {useMutation} from "@/utils/hooks/useMutation";
import {addCategory} from "@/app/admin/main/categories/halpers/addCategory";
import {editCategory} from "@/app/admin/main/categories/halpers/editCategory";
import {deleteCategory} from "@/app/admin/main/categories/halpers/deleteCategory";
import {useState} from "react";
import {useQuery} from "@/utils/hooks/useQuery";
import {CategoryResponseDTO, ImageDTO, TextStructure} from "@/backend/types";
import {getCategory} from "@/app/admin/main/categories/halpers/getCategory";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {log} from "util";
import DeleteConfirmationModal from "@/app/admin/main/products/helpers/deleteProductModal";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/components/controls/button";
import Link from "next/link";
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {Input} from "@/components/controls/input";
import * as yup from "yup";


interface Prop {
    id?: string
}
export  const CategoryForm = ({id} : Prop) => {
    const router = useRouter()
    const {mutate: addCategoryMutate, isLoading : addCategoryLoading} = useMutation(addCategory);
    const {mutate: editCategoryMutate, isLoading: editCategoryLoading } = useMutation(editCategory);
    const {mutate: deleteCategoryMutate, isLoading: deleteCategoryLoading} = useMutation(deleteCategory);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const {data: categoryResponse, isLoading: categoryLoading} = useQuery<CategoryResponseDTO[]>(() => getCategory(id), [], {fetchOnMount: !!id});

    const category = categoryResponse

    const validationSchema = yup.object().shape({
        name: yup.object().shape({
            am: yup.string().required("Обязательное поле"),
            ru: yup.string().required("Обязательное поле"),
        }),
        image: yup.object().shape({extension: yup.string(), id: yup.string(), src: yup.string() }).nullable(),
    })

    interface Category {
        name: TextStructure;
        image?: ImageDTO
    }

    console.log(category, "category")


    const loading = editCategoryLoading || addCategoryLoading || deleteCategoryLoading || categoryLoading

    const {
        control ,
        handleSubmit,
        register,
        getValues,
        formState: {errors}
    } = useForm<Category>({
        resolver: yupResolver(validationSchema),
        ...(category ? {
            values: {
                name: category?.name,
                image: category?.image
            }
        }: {})
    }) ?? {};

    console.log(errors, "errorssssss")


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
            addCategoryMutate(getValues()).then(() => router.push('/admin/main/categories'))
        }
    }

    const submit = () => {
        handleSubmit(() => {
            onSubmit()
        })()
    }

    console.log(getValues().image)
    return (
        <div>
            <DeleteConfirmationModal isOpen={deleteModalOpen} onDelete={onDelete} onClose={onCancel} />
            {loading && <LoadingSpinner />}
            <div className={"flex justify-end mb-5 gap-2"}>
                {
                    id
                        ?
                        <Button className='w-[100px] bg-red-700 hover:bg-red-800 text-white' onClick={() => {
                            setDeleteModalOpen(true)
                        }}>Удалить</Button>
                        : <></>
                }
                <Link href="/admin/main/categories">
                    <Button className="bg-blue-700 hover:bg-blue-800">Отмена</Button>
                </Link>
                <Button className="bg-green-800 hover:bg-green-900" onClick={submit}>Сохранить</Button>
            </div>
            <div className="xl:w-[60%] mx-auto w-full col-auto">
                <div className="text-3xl mb-10">Добавить категорию</div>
                <div className="flex gap-4">
                    <ImageGallery control={control} name='image' />
                    <div className='flex-1'>
                        <Input
                            {...register("name.am")}
                            label="Название категории по АРМ"
                            placeholder="Название по АРМ"
                            error={errors.name?.am?.message}
                            required={true}
                            className='w-full mb-3'
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
        </div>

    )
}