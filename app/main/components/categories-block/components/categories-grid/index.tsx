import {CategoryCard} from "@/app/main/components/categories-block/components/categories-grid/components/category-card";
import { CategoryResponseDTO } from "@/backend/types";
import {Button} from "@/app/main/components/controls/button";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {useRouter} from "next/navigation";
import {BUTTON_TITLE} from "@/app/main/components/categories-block/costants";

type Props = {
    categories: CategoryResponseDTO[];
}
export const CategoriesGrid = ({categories}: Props) => {
    const { getLanguage } = useLanguage();
    const router = useRouter()

    const handleSeeMore = () => {
        router.push('/main/categories')
    }
    const getSelectProductData = (id:string) => {
        router.push(`/main/products?category=${id}`)
    }
    const categoriesData = categories.slice(0,6)
    return(
        <div>
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-[10px]'>
                {
                    categoriesData?.map((item) => (
                        <CategoryCard key={item._id} data={item} onClick={getSelectProductData}/>
                    ))
                }

            </div>
            <div className='flex justify-items-start lg:justify-end mt-6 md:mt-9 xl:mt-12'>
                <Button onClick={handleSeeMore}>{getLanguage(BUTTON_TITLE)}</Button>
            </div>
        </div>

    )
}