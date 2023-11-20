'use client'
import {CATEGORIES} from "@/app/main/categories/constants";
import {PageHeaderBackground} from "../components/page-header-background";
import {CategoriesPageDTO, CategoryResponseDTO} from "@/backend/types";
import {CategoriesPageGrid} from "@/app/main/categories/components/categories-page-grid";

interface Props {
    data: CategoryResponseDTO[];
    imageData: CategoriesPageDTO
}

export const PageContent = ({data, imageData}:Props) => {
    return(
        <div>
            <PageHeaderBackground title={CATEGORIES} imageData={imageData?.image}/>
            <CategoriesPageGrid categories={data}/>
        </div>
    )
}