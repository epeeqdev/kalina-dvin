'use client'
import {HomePageSection} from "../home-page-section";
import {CategoriesGrid} from "@/app/main/components/categories-block/components/categories-grid";
import {CategoryResponseDTO} from "@/backend/types";
import {BLOCK_TITLE} from "@/app/main/components/categories-block/costants";

interface Props {
    categories: CategoryResponseDTO[]
}
export const CategoriesBlock = ({categories}: Props) => {
    return  (
        <HomePageSection
            header={BLOCK_TITLE}
            childrenClassName='px-[5%]'
            className='pt-[25px] pb-0 lg:pt-[45px]'
        >
            <CategoriesGrid categories={categories}/>
        </HomePageSection>
    )
}