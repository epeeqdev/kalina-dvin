"use client"

import {Input} from "@/components/controls/input";
import ImageGallery from "@/app/admin/main/products/components/ImageGallery";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@/components/controls/button";
import Link from "next/link";
import {string} from "yup";
import {useMutation} from "@/utils/hooks/useMutation";
import {addCategory} from "@/app/admin/main/products/helpers/addCategory";
import {ImageDTO, TextStructure} from "@/backend/types";
import {useQuery} from "@/utils/hooks/useQuery";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {useRouter} from "next/navigation";
const validationSchema = yup.object().shape({
    name: yup.object().shape({
        am: yup.string().required("Обязательное поле"),
        ru: yup.string().required("Обязательное поле"),
    }),
    image: yup.object().shape({extension: string(), id: string(), src: string() }),
})

interface Category {
    name: TextStructure;
    image?: ImageDTO
}

export default function AddCategoryPage({id}: {id: string }){

    const {data} = useQuery()
    const {mutate, isLoading} = useMutation(addCategory);
    const router = useRouter()

    const {
        control ,
        handleSubmit,
        register,
        getValues,
        formState: {errors}
    } = useForm<Category>({
        resolver: yupResolver(validationSchema),
        ...(data ? {
            values: {
                name: data.name,
                image: data.image
            }
        }: {})
    }) ?? {};

    const onSubmit = async () => {
        if (id) {
            //edit
        } else {
            mutate(getValues())
            router.push('/admin/main/categories')
        }

    }



    const submit = () => {
        console.log(getValues())
        handleSubmit(() => {
            onSubmit()
        })()
    }

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            <div className={"flex justify-end mb-5 gap-2"}>
                <Link href="/admin/main/categories">
                    <Button className="bg-blue-700 hover:bg-blue-800">Отмена</Button>
                </Link>
                    <Button  onClick={submit}>Сохранить</Button>
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