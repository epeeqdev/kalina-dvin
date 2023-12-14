'use client'

import {useQuery} from "@/utils/hooks/useQuery";
import {AttributeDTO, BrandResponseDTO, CategoryResponseDTO, ProductResponseDTO} from "@/backend/types";
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {useRouter} from "next/navigation";
import {getBrands} from "@/app/admin/main/brands/helpers/getBrands";
import BrandTemplate from "@/app/admin/main/brands/components/template/brandTemplate";
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
    const {data: products} = useQuery<ProductResponseDTO[]>(getProducts);

    return (
        <PageLayout headerTitle={"Главная"}>

            {/*-----------------------------------------------------       CATEGORIES       ---------------------------------------------------------*/}

            <MainPageSectionComponent title={"Категории"} path={"categories"}>
                {(!categories || !categories[0]) && <div className="text-lg">Категории не найдены.</div>}
                {categories?.slice(0,6)?.map(item => <CategoryTemplate item={item} key={item._id} shownInMainPage={true}/>)}
            </MainPageSectionComponent>
            {/*-----------------------------------------------------         BRANDS        ---------------------------------------------------------*/}

            <MainPageSectionComponent title={"Бренды"} path={"brands"}>
                {(!brands || !brands[0]) && <div className="text-lg">Бренды не найдены.</div>}
                {brands?.slice(0,6)?.map(item => <BrandTemplate item={item} key={item._id} shownInMainPage={true}/>)}
            </MainPageSectionComponent>
            {/*-----------------------------------------------------       ATTRIBUTES        ---------------------------------------------------------*/}

            <MainPageSectionComponent title={"Атрибуты"} path={"attributes"}>
                {(!attributes || !attributes[0]) && <div className="text-lg">Атрибуты не найдены.</div>}
                {attributes?.slice(0,6)?.map(item => <AttributeTemplate item={item} key={item._id} className="whitespace-nowrap"/>)}
            </MainPageSectionComponent>
            {/*-----------------------------------------------------        PRODUCTS        ---------------------------------------------------------*/}

            <MainPageSectionComponent title={"Продукты"} path={"products"}>
                {(!products || !products[0]) && <div className="text-lg">Продкты не найдены.</div>}
                {products?.slice(0,6)?.map(item => <ProductTemplate key={item._id} item={item}/>)}
            </MainPageSectionComponent>
        </PageLayout>
    )
}
