'use client'

import {useQuery} from "@/utils/hooks/useQuery";
import {AttributeDTO, BrandResponseDTO, CategoryResponseDTO, ProductResponseDTO} from "@/backend/types";
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {useRouter} from "next/navigation";
import {getBrands} from "@/app/admin/main/brands/helpers/getBrands";
import BrandTemplate from "@/app/admin/main/brands/helpers/brandTemplate";
import AttributeTemplate from "@/app/admin/main/attributes/halpers/attributeTemplate";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import MainPageSectionComponent from "@/app/admin/main/components/mainPageSectionComponent";
import {getProducts} from "@/app/admin/main/products/helpers/getProducts";
import {ProductTemplate} from "@/components/product";
import {getCategories} from "@/app/admin/main/categories/halpers/getCategories";
import {getAttributes} from "@/app/admin/main/attributes/halpers/getAttributes";

export default function AdminMain() {

    const router = useRouter()
    const {data: categories} = useQuery<CategoryResponseDTO[]>(getCategories);
    const {data: brands} = useQuery<BrandResponseDTO[]>(getBrands);
    const {data: attributes} = useQuery<AttributeDTO[]>(getAttributes);
    const {data: products} = useQuery<ProductResponseDTO[]>(getProducts);g

    return (
        <PageLayout headerTitle={"Главная"}>

            {/*-----------------------------------------------------       CATEGORIES       ---------------------------------------------------------*/}

            <MainPageSectionComponent title={"categories"}>
                {categories?.slice(0,6)?.map(item => <CategoryTemplate item={item} key={item._id} shownInMainPage={true}/>)}
            </MainPageSectionComponent>
            {/*-----------------------------------------------------         BRANDS        ---------------------------------------------------------*/}

            <MainPageSectionComponent title={"brands"}>
                {brands?.slice(0,6)?.map(item => <BrandTemplate item={item} key={item._id} shownInMainPage={true}/>)}
            </MainPageSectionComponent>
            {/*-----------------------------------------------------       ATTRIBUTES        ---------------------------------------------------------*/}

            <MainPageSectionComponent title={"attributes"}>
                {attributes?.slice(0,6)?.map(item => <AttributeTemplate item={item} key={item._id} className="whitespace-nowrap"/>)}
            </MainPageSectionComponent>
            {/*-----------------------------------------------------        PRODUCTS        ---------------------------------------------------------*/}

            <MainPageSectionComponent title={"products"}>
                {products?.slice(0,6)?.map(item => <ProductTemplate className='col-span-12 lg:col-span-6 xl:col-span-4' key={item._id} item={item}/>)}
            </MainPageSectionComponent>


        </PageLayout>
    )
}
