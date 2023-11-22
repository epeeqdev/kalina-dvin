'use client'
import {ProductResponseDTO} from "@/backend/types";
import {ProductInfo} from "@/app/main/products/[id]/components/product-info";
import {ProductsSection} from "@/app/main/products/[id]/components/products-section";

interface Props {
    data: ProductResponseDTO;
    products: ProductResponseDTO[]

}

export const ProductContent = ({data, products}:Props) =>{
    return (
        <div>
            <ProductInfo data={data}/>
            <ProductsSection products={products}/>
        </div>
    )
}