"use client"
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {CategoryResponseDTO, ImageDTO} from "@/backend/types";
import {getCategoriesPage} from "@/app/admin/helpers/api/getCategoriesPage";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {editCategoriesPage} from "@/app/admin/helpers/api/editCategoriesPage";
import LoadingSpinner from "@/components/controls/loading-spinner";


const validationSchema = yup.object().shape({
    image: yup.object().shape({extension: yup.string(), id: yup.string(), src: yup.string()}).nullable(),
})
export default function CategoriesPageForm() {

    const router = useRouter()
    const {data: image, isLoading: imageLoading} = useQuery<CategoryResponseDTO>(getCategoriesPage);
    const {mutate: editCategoriesImage, isLoading: editCategoriesLoading} = useMutation(editCategoriesPage);


    const {
        control,
        formState: {errors},
        getValues
    } = useForm<ImageDTO>({
        resolver: yupResolver(validationSchema),
        ...(image ? {
            values: {
                image: image.image
            }
        } : {})
    }) ?? {};

    const onEdit = () => {
        editCategoriesImage(getValues())
    }

    return (
        <div className="mx-auto w-full col-auto ">
            {editCategoriesLoading && <LoadingSpinner />}
            <div className="text-3xl mb-5">Добавить обложку в странице категории</div>
            <Button className="fixed top-4 right-4" variant="primary" onClick={() => {
                onEdit()
                router.push("/admin/main")
            }}>Сохранить</Button>
            <div className="flex gap-4 justify-center">
                <ImageGallery control={control} name='image' className="max-w-[80%] border-none" classNameSecond="w-[100%] h-[50%] object-fill" classNameThree="pt-[50%]"/>
            </div>

        </div>
    )
}