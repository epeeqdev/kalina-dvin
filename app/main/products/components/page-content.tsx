'use client'
import {CategoryResponseDTO, ProductResponseDTO} from "@/backend/types";
import {CategoriesSlider} from "@/app/main/products/components/categories-slider";
import {ProductCard} from "@/app/main/products/components/product-card";
import {ProductsGrid} from "@/app/main/products/components/products-grid";
import PaginationComponent from "@/app/main/components/pagination";

interface Props {
    categories?: CategoryResponseDTO[];
    products?: ProductResponseDTO[];
}

export const ProductsPageContent = ({categories, products}: Props) => {
    return <div className='pb-10'>
        <CategoriesSlider categories={categories}/>
        <ProductsGrid products={products}/>
    </div>
}