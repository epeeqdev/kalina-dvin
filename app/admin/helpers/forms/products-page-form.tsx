"use client"
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useQuery} from "@/utils/hooks/useQuery";
import {ImageDTO, ProductsPageDTO} from "@/backend/types";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {editProductsPage} from "@/app/admin/helpers/api/editProductsPage";
import {useMutation} from "@/utils/hooks/useMutation";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {getProductsPage} from "@/app/admin/helpers/api/getProductsPage";


const validationSchema = yup.object().shape({
    image: yup.object().shape({extension: yup.string(), id: yup.string(), src: yup.string() }).nullable(),
})
export default function ProductsPageForm(){

    const {data: image, isLoading: imageLoading} = useQuery<ProductsPageDTO>(getProductsPage);
    const {mutate: editProductPage, isLoading: editProductLoading} = useMutation(editProductsPage)
    const router = useRouter()


    const isLoading = imageLoading || editProductLoading

    const {
        control ,
        formState: {errors},
        getValues
    } = useForm<ImageDTO>({
        resolver: yupResolver(validationSchema),
        ...(image ? {
            values: {
                image: image?.image
            }
        }: {})
    });

    const onEdit = () => {
        editProductPage(getValues())
        router.push("/admin/main")
    }

    return (

        <div className="mx-auto w-full col-auto">
            {isLoading && <LoadingSpinner />}
            <div className="text-3xl mb-5">Добавить обложку главной страницы</div>
            <Button className="fixed top-4 right-4" variant="primary" onClick={() => {
                onEdit()
            }}>Сохранить</Button>
            <div className="flex gap-4 justify-center">
                <ImageGallery control={control} name='image' className="max-w-[80%] border-none" classNameSecond="w-[100%] max-h-[50%] object-fill" classNameThree="pt-[50%]"/>
            </div>

        </div>
    )
}