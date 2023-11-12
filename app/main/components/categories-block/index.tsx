'use client'
import {BlockBox} from "@/app/main/components/controls/block-box";
import {CategoriesGrid} from "@/app/main/components/categories-block/components/categories-grid";
import {CategoryResponseDTO} from "@/backend/types";
import {BLOCK_TITLE} from "@/app/main/components/categories-block/costants";

interface Props {
    categories: CategoryResponseDTO[]
}
export const CategoriesBlock = ({categories}: Props) => {
    return  (
        <BlockBox
            header={BLOCK_TITLE}
            childrenClassName='px-[5%]'
            className='pt-[45px] lg:pt-[120px] pb-[45px]'
        >
            <CategoriesGrid categories={categories}/>
        </BlockBox>
    )
}