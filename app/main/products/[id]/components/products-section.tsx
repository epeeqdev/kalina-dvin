import {ProductResponseDTO} from "@/backend/types";
import {ProductCard} from "@/app/main/products/components/product-card";
import {it} from "node:test";


interface Props {
    products: ProductResponseDTO[];
    id: string
}

export const ProductsSection = ({products, id}:Props) => {
    const productsData = products.filter((item) => item._id !== id).slice(0,5)
    return (
        <>
            {productsData.length ? <div className='mt-[87px] relative mx-[5%]'>
                <div className='h-[1px] bg-secondary max-w-[360px] w-full absolute left-1/2 transform -translate-x-1/2'/>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[8px] md:gap-x-[12px] lg:gap-x-[18px] xl:gap-x-[24px] pt-[56px]'>
                    {
                        productsData.map((item) => (
                            <ProductCard data={item} key={item._id}/>
                        ))
                    }
                </div>
            </div>: null

            }
        </>
    )
}