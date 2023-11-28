'use client'
import {BrandResponseDTO, CategoryResponseDTO, ProductResponseDTO} from "@/backend/types";
import {ProductsGrid} from "@/app/main/products/components/products-grid";
import {useEffect, useState} from "react";
import {Filter} from "@/app/main/products/components/filter";
import IconComponent from "@/components/icon";
import {useSearchParams} from "next/navigation";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Typography} from "@/app/main/components/controls/typography";
import {Input} from "@/app/main/components/controls/input";
import {useDebouncedState} from "@/utils/hooks/useDebouncedState";

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
    const [searchResults,setSearchResults] = useState(products)
    const [search, setSearch] = useDebouncedState('');
    useEffect(() => {
        if(search){
            const regex = new RegExp(search, 'i')
            const results = products.filter((item) => {
                    return regex.test(item.title.am) || regex.test(item.title.ru)
                }

            );
            setSearchResults(results);
        }else {
            setSearchResults(products)
        }

    },[search, products])

    return <div className='md:min-h-screen px-[5%]'>
        <div className='flex my-4'>
            <div onClick={() => setFilterOpened(v => !v)}
                 className='inline-flex md:w-[270px] justify-center py-2 md:px-4 px-1 items-center md:gap-3 gap-1 bg-primary text-white hover:bg-primary-darker cursor-pointer'>
                <IconComponent name='filter' size='md'/>
                <Typography color='inherit' className='hidden md:flex'>
                    <span>{isFilterOpened ? getLanguage(translates.filter.closeButton) : getLanguage(translates.filter.openButton)}</span>
                </Typography>
                <Typography color='inherit'>
                    <span className='md:mt-1 block'>({filtersCount})</span>
                </Typography>
            </div>
            <div className='w-full max-w-[800px] pl-[20px]'>
                <Input onChange={(e) => setSearch(e.target.value)}/>
            </div>
        </div>
        <div className='pb-10 flex w-full'>
            <Filter onOpen={() => setFilterOpened(true)} onClose={() => setFilterOpened(false)} categories={categories} brands={brands}
                    isOpen={isFilterOpened}/>
            <ProductsGrid products={searchResults}/>
        </div>
    </div>
}