import {useRouter} from "next/navigation";
import {useMutation} from "@/utils/hooks/useMutation";
import {addBrand} from "@/app/admin/main/brands/halpers/addBrand";
import {editBrand} from "@/app/admin/main/brands/halpers/editBrand";
import {deleteBrand} from "@/app/admin/main/brands/halpers/deleteBrand";
import {useState} from "react";
import {useQuery} from "@/utils/hooks/useQuery";
import {BrandResponseDTO, ImageDTO, TextStructure} from "@/backend/types";
import {getBrand} from "@/app/admin/main/brands/halpers/getBrand";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import DeleteConfirmationModal from "@/app/admin/main/products/helpers/deleteProductModal";
import LoadingSpinner from "@/components/controls/loading-spinner";
import Link from "next/link";
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {Input} from "@/components/controls/input";
import * as yup from "yup";
import {Button} from "../../components/controls/button";

interface Props {
    id?: string
}
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
export const BrandForm = ({id}:Props) => {
    const router = useRouter()
    const {mutate: addBrandMutate, isLoading : addBrandLoading} = useMutation(addBrand);
    const {mutate: editBrandMutate, isLoading: editBrandLoading } = useMutation(editBrand);
    const {mutate: deleteBrandMutate, isLoading: deleteBrandLoading} = useMutation(deleteBrand);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const {data: brandResponse, isLoading: brandLoading} = useQuery<BrandResponseDTO[]>(getBrand,[id], {fetchOnMount: !!id});

    const brand = brandResponse

    console.log(brandResponse, "brandResponse")


    const loading = editBrandLoading || addBrandLoading || deleteBrandLoading || brandLoading

    const {
        control ,
        handleSubmit,
        register,
        getValues,
        formState: {errors}
    } = useForm<Category>({
        resolver: yupResolver(validationSchema),
        ...(brand ? {
            values: {
                name: brand?.name,
                image: brand?.image
            }
        }: {})
    }) ?? {};


    const onCancel = () => {
        setDeleteModalOpen(false)
    }
    const onDelete = async () => {
        deleteBrandMutate(id).then(() => router.push('/admin/main/brands')).catch((e) => console.log("cqatch error" , e));
    }


    const onSubmit = async () => {
        if (id) {
            editBrandMutate(id, getValues()).then(() => router.push('/admin/main/brands'))
        } else {
            addBrandMutate(getValues()).then(() => router.push('/admin/main/brands'))
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
                title="Вы уверены, что хотите удалить данный бренд?"
                message="После удаления бренд не возможно восстановить!"
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
                <Link href="/admin/main/brands">
                    <Button variant="secondary">Отмена</Button>
                </Link>
                <Button variant="primary" onClick={submit}>Сохранить</Button>
            </div>
            <div className="xl:w-[60%] mx-auto w-full col-auto">
                <div className="text-3xl mb-10">Добавить Бренд</div>
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