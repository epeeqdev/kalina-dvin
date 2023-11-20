'use client'
import {BrandResponseDTO, CategoryResponseDTO, ProductResponseDTO} from "@/backend/types";
import {ProductsGrid} from "@/app/main/products/components/products-grid";
import {useState} from "react";
import {Filter} from "@/app/main/products/components/filter";
import IconComponent from "@/components/icon";
import {useSearchParams} from "next/navigation";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Typography} from "@/app/main/components/controls/typography";

interface Props {
    categories?: CategoryResponseDTO[];
    products?: ProductResponseDTO[];
    brands?: BrandResponseDTO[];
}

const translates = {
    filter: {
        openButton: {am: 'Բացել ֆիլտրը', ru: 'Открыть фильтр'},
        closeButton: {am: 'Փակել ֆիլտրը', ru: 'Закрыть фильтр'},
    }
}

export const ProductsPageContent = ({categories, products, brands}: Props) => {
    const [isFilterOpened, setFilterOpened] = useState(false);
    const {getLanguage} = useLanguage();
    const searchParams = useSearchParams();
    const filtersCount = searchParams?.toString()?.split('&')?.filter(Boolean)?.length ?? 0;
    return <div className='min-h-screen'>
        <div onClick={() => setFilterOpened(v => !v)}
             className='flex md:w-[270px] justify-center items-center my-4 py-2 px-4 border border-gray-lighter items-center gap-3 bg-white hover:bg-gray-lighter cursor-pointer'>
            <IconComponent name='filter' size='lg'/>
            <Typography className='gap-1 items-center hidden md:flex'>
                <span>{isFilterOpened ? getLanguage(translates.filter.closeButton) : getLanguage(translates.filter.openButton)}</span>
                <span className='mt-1'>({filtersCount})</span>
            </Typography>
        </div>
        <div className='pb-10 flex w-full'>
            <Filter onClose={() => setFilterOpened(false)} categories={categories} brands={brands}
                    isOpen={isFilterOpened}/>
            <ProductsGrid products={products}/>
        </div>
    </div>
}