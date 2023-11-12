import {BlockBox} from "@/app/main/components/controls/block-box";
import {CategoriesGrid} from "@/app/main/components/categories-block/components/categories-grid";


export const CategoriesBlock = () => {
    return  (
        <BlockBox
            header={{am: 'Կատեգորիաներ', ru: 'Категории'}}
            childrenClassName='px-[5%]'
            className='pt-[45px] lg:pt-[120px] pb-[45px]'
        >
            <CategoriesGrid/>
        </BlockBox>
    )
}