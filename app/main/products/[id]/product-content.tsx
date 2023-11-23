'use client'
import {ProductResponseDTO} from "@/backend/types";
import {ProductInfo} from "@/app/main/products/[id]/components/product-info";
import {ProductsSection} from "@/app/main/products/[id]/components/products-section";

interface Props {
    data: ProductResponseDTO;
    products: ProductResponseDTO[];
    selectedProductId:string

}

export const ProductContent = ({data, products, selectedProductId}:Props) =>{
    return (
        <div className='mb-[50px] lg:mb-[134px] md:mt-[4%]'>
            <ProductInfo data={data}/>
            <ProductsSection products={products} id={selectedProductId}/>
        </div>
    )
}