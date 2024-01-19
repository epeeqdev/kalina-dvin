import {useRouter} from "next/navigation";
import {useMutation} from "@/utils/hooks/useMutation";
import {addBrand} from "@/app/admin/main/brands/helpers/addBrand";
import {editBrand} from "@/app/admin/main/brands/helpers/editBrand";
import {deleteBrand} from "@/app/admin/main/brands/helpers/deleteBrand";
import {useState} from "react";
import {useQuery} from "@/utils/hooks/useQuery";
import {BrandResponseDTO, ImageDTO, TextStructure} from "@/backend/types";
import {getBrand} from "@/app/admin/main/brands/helpers/getBrand";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Input} from "@/components/controls/input";
import * as yup from "yup";
import {Button} from "../../components/controls/button";
import Alert from "../../products/helpers/alert";
import {ImageUploader} from "@/app/admin/main/components/form-wrapped-controls/image-uploader";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {ADD_BRANDS, CANCEL_BUTTON, DELETE_BUTTON, SAVE_BUTTON} from "../../costants";
import { useLanguage } from "@/app/main/hooks/useLanguage";

interface Props {
    id?: string
}
const validationSchema = yup.object().shape({
    name: yup.object().shape({
        am: yup.string().required({am: "Պարտադիր լրացման դաշտ", ru: "Обязательное поле"}),
        ru: yup.string().required({am: "Պարտադիր լրացման դաշտ", ru: "Обязательное поле"}),
    }),
    image: yup.object().shape({id: yup.string(), src: yup.string()}).required({am: "Նկարը պարտադիր է", ru: "Изображение обязательно"}),
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
    const {data: brand, isLoading: brandLoading} = useQuery<BrandResponseDTO>(getBrand,[id], {fetchOnMount: !!id});
    const {getLanguage} = useLanguage();

    const loading = editBrandLoading || addBrandLoading || deleteBrandLoading || brandLoading

    const {
        control ,
        handleSubmit,
        register,
        getValues,
        formState: {errors, isDirty}
    } = useForm<Category>({
        resolver: yupResolver(validationSchema),
            values: {
                name: brand ? brand?.name : null,
                image:brand ? brand?.image : null
            }
    }) ?? {};


    const onCancel = () => {
        setDeleteModalOpen(false)
    }
    const onDelete = async () => {
        deleteBrandMutate(id).then(() => router.push('/admin/main/brands'));
    }

    const onSubmit = async () => {
        if (id) {
            editBrandMutate(id, getValues()).then(() => router.push('/admin/main/brands'))
        } else {
            addBrandMutate(getValues()).then((data) => router.push(`/admin/main/brands/edit/${data._id}`))
        }
    }

    const submit = () => {
        handleSubmit(() => {
            onSubmit()
        })()
    }

    return (
        <div>
            <Alert title={{am: "Ջնջել բրենդը", ru: "Удалить бренд ?"}} onCancel={onCancel} onClose={onCancel} onAccept={onDelete} isOpen={deleteModalOpen}>
                <p className="text-2xl font-bold ">
                    {getLanguage({
                        am: "Դուք վստահ եք որ ուզում եք ջնջել այս բրենդը",
                        ru: "Вы уверены, что хотите удалить данный бренд?"
                    })}</p>
                <p className="text-gray-700">
                    {getLanguage({
                        am: "Ջնջելուց հետո հնարավոր չէ վերականգնել",
                        ru: "После удаления бренд не возможно восстановить!"
                    })}
                </p>
            </Alert>
            {loading && <LoadingSpinner/>}
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
                        <Button title={CANCEL_BUTTON} onClick={() => router.push("/admin/main/brands")} variant="secondary"></Button>
                    {isDirty && <Button title={SAVE_BUTTON} variant="primary" onClick={submit}></Button>}
                </>
            } headerTitle={ADD_BRANDS}>
                <div className=" w-[100%] pl-5 pr-5 pr-5 mb-20">
                    <div className="gap-4">
                        <ImageUploader error={errors.image?.message} imageFit='contain' control={control} name='image' imageHeightProportion={50} />
                        <div className='flex-1'>
                            <Input
                                {...register("name.am")}
                                label={{am: "Բրենդի անվանումը Հայ", ru: "Название бренда по АРМ"}}
                                placeholder={{am: "Բրենդի անվանումը Հայ", ru: "Название бренда по АРМ"}}
                                error={errors.name?.am}
                                required={true}
                                className='w-full mb-5'
                            />
                            <Input
                                {...register("name.ru")}
                                label={{am: "Բրենդի անվանումը Ռուս", ru: "Название бренда по РУС"}}
                                placeholder={{am: "Բրենդի անվանումը Ռուս", ru: "Название бренда по РУС"}}
                                error={errors.name?.ru}
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