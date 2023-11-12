'use client'
import {CategoryResponseDTO, ProductResponseDTO} from "@/backend/types";
import {CategoriesSlider} from "@/app/main/products/components/categories-slider";
interface Props {
    categories?: CategoryResponseDTO[];
    products?: ProductResponseDTO[];
}
export const ProductsPageContent = ({categories, products}:Props) => {
    console.log(products);
    return <div>
    <CategoriesSlider categories={categories}/>
    </div>
}