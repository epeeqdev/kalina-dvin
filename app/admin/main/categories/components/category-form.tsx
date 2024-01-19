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
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Input} from "@/components/controls/input";
import * as yup from "yup";
import {Button} from "../../components/controls/button";
import Alert from "@/app/admin/main/products/helpers/alert";
import {ImageUploader} from "@/app/admin/main/components/form-wrapped-controls/image-uploader";

import {PageLayout} from "@/app/admin/main/components/page-layout";
import {ADD_CATEGORIES, CANCEL_BUTTON, DELETE_BUTTON, SAVE_BUTTON} from "../../costants";
import { useLanguage } from "@/app/main/hooks/useLanguage";


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
    const {getLanguage} = useLanguage();

    const validationSchema = yup.object().shape({
        name: yup.object().shape({
            am: yup.string().required({am: "Պարտադիր լրացման դաշտ", ru: "Обязательное поле"}),
            ru: yup.string().required({am: "Պարտադիր լրացման դաշտ", ru: "Обязательное поле"}),
        }),
        image: yup.object().shape({id: yup.string(), src: yup.string()}).required({am: "Նկարը պարտադիր է", ru: "Изображение обязательно"})
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
        deleteCategoryMutate(id).then(() => router.push('/admin/main/categories')).catch((e) => console.log("catch error" , e));
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
            <Alert title={{am: "Ջնջել կատեգորիան", ru: "Удалить категорию ?"}} onCancel={onCancel} onClose={onCancel} onAccept={onDelete} isOpen={deleteModalOpen}>
                <p className="text-2xl font-bold ">
                    {getLanguage({
                        am: "Դուք վստահ եք որ ուզում եք ջնջել այս կատեգորիան",
                        ru: "Вы уверены, что хотите удалить данный категорию?"
                    })}</p>
                <p className="text-gray-700">
                    {getLanguage({
                        am: "Ջնջելուց հետո հնարավոր չէ վերականգնել",
                        ru: "После удаления категорию не возможно восстановить!"
                    })}
                </p>
            </Alert>
            {isLoading && <LoadingSpinner/>}
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
                    <Button title={CANCEL_BUTTON} onClick={() => {
                        router.push('/admin/main/categories')
                    }}  variant="secondary"></Button>
                    {isDirty && !isLoading && <Button variant="primary" title={SAVE_BUTTON} onClick={submit}></Button>}
                </>
            } headerTitle={ADD_CATEGORIES}>
                <div className=" w-[100%] pl-5 pr-5 mb-20">
                    <div className="gap-4">
                        <ImageUploader error={errors.image?.message} control={control} name='image' imageHeightProportion={50}/>
                        <div className='flex-1'>
                            <Input
                                {...register("name.am")}
                                label={{am: "Կատեգորիայի անվանումը Հայ", ru: "Название категории по АРМ"}}
                                placeholder={{am: "Կատեգորիայի անվանումը Հայ", ru: "Название категории по АРМ"}}
                                error={errors?.name?.am}
                                required={true}
                                className='w-full mb-5'
                            />
                            <Input
                                {...register("name.ru")}
                                label={{am: "Կատեգորիայի անվանումը Ռուս", ru: "Название категории по РУС"}}
                                placeholder={{am: "Կատեգորիայի անվանումը Ռուս", ru: "Название категории по РУС"}}
                                error={errors?.name?.ru}
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