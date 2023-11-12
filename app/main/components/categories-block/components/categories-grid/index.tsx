import {CategoryCard} from "@/app/main/components/categories-block/components/categories-grid/components/category-card";


export const CategoriesGrid = () => {
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[10px]'>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
        </div>
    )
}