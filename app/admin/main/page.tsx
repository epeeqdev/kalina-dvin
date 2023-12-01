'use client'

import {useQuery} from "@/utils/hooks/useQuery";
import {AttributeDTO, BrandResponseDTO, CategoryResponseDTO} from "@/backend/types";
import axios from "@/axios";
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {getBrands} from "@/app/admin/main/brands/helpers/getBrands";
import BrandTemplate from "@/app/admin/main/brands/helpers/brandTemplate";
import AttributeTemplate from "@/app/admin/main/attributes/halpers/attributeTemplate";
import {PageLayout} from "@/app/admin/main/components/page-layout";

export default function AdminMain() {

    const router = useRouter()
    const {data: categories, isLoading: categoriesLoading} = useQuery<CategoryResponseDTO[]>(() => axios.get(`/api/categories`));
    const {data: brands, isLoading: BrandsLoading} = useQuery<BrandResponseDTO[]>(getBrands);
    const {data: attributes, isLoading: attributesLoading} = useQuery<AttributeDTO[]>(() => axios.get(`/api/attributes`));

    return (
        <PageLayout headerTitle={"Главная"}>

            {/*-----------------------------------------------------         CATEGORIES         ---------------------------------------------------------*/}

            <div className="my-10">
                <span className="text-2xl flex my-10 mx-5">Категории</span>
                <div className="pl-5 pr-5 grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-2">
                    {categories?.slice(0,6)?.map((item) => {
                        return (
                            <CategoryTemplate
                                item={item}
                                key={item._id}
                                shownInMainPage={true}
                            />
                        )
                    })
                    }
                </div>
                <div className="flex justify-end my-10 mx-5">
                    <Button variant="primary" onClick={() => router.push("main/categories")}>Подробнее</Button>
                </div>
                <div className='w-full flex justify-center '>
                    <div className='border border-b-grey-400 w-full mx-5'/>
                </div>
            </div>

            {/*-----------------------------------------------------         BRANDS         ---------------------------------------------------------*/}

            <div>
                <span className="text-2xl flex my-10 mx-5">Бренды</span>
                <div className="pl-5 pr-5 grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-2">
                    {brands?.slice(0,6)?.map((item) => {
                        return (
                            <BrandTemplate
                                item={item}
                                key={item._id}
                                shownInMainPage={true}
                            />
                        )
                    })
                    }
                </div>
                <div className="flex justify-end my-10 mx-5">
                    <Button variant="primary" onClick={() => router.push("main/brands")}>Подробнее</Button>
                </div>
                <div className='w-full flex justify-center '>
                    <div className='border border-b-grey-400 w-full mx-5'/>
                </div>
            </div>

            {/*-----------------------------------------------------         ATTRIBUTES         ---------------------------------------------------------*/}

            <div>
                <span className="text-2xl flex mx-5 my-10">Атрибуты</span>
                <div className="pl-5 pr-5 grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-2">
                    {attributes?.slice(0,6)?.map((item) => {
                        return (
                            <AttributeTemplate
                                item={item}
                                key={item._id}
                                className="whitespace-nowrap"
                            />
                        )
                    })
                    }
                </div>
                <div className="flex justify-end my-10 mx-5">
                    <Button variant="primary" onClick={() => router.push("main/attributes")}>Подробнее</Button>
                </div>
                <div className='w-full flex justify-center '>
                    <div className='border border-b-grey-400 w-full mx-5' />
                </div>
            </div>

            {/*-----------------------------------------------------         PRODUCTS         ---------------------------------------------------------*/}


        </PageLayout>
    )
}
