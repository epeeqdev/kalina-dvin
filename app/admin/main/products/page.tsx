'use client'

import {useEffect, useState} from "react";
import {getProductsWithSearch} from "@/app/admin/main/products/helpers/getProducts";
import {ProductTemplate} from "@/components/product";
import {Input} from "@/components/controls/input";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {useDebouncedState} from "@/utils/hooks/useDebouncedState";
import {useQuery} from "@/utils/hooks/useQuery";
import {ProductResponseDTO} from "@/backend/types";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";
import {ADD_BUTTON, PRODUCTS} from "../costants";

export default function ProductsPage() {
    const {data, isLoading,refetch} = useQuery<ProductResponseDTO[]>(getProductsWithSearch, [], {fetchOnMount: false});
    const [search, setSearch] = useDebouncedState('');
    const [searchResults,setSearchResults]=useState(data)
    const router = useRouter()

    useEffect(() => {
        refetch('' as any)
    }, [])

    useEffect(() => {
        if(search){
            const regex = new RegExp(search, 'i')
            const results = data?.filter((item) => {
                    return regex.test(item.brand.name.am) || regex.test(item.brand.name.ru)
                        || regex.test(item.title.am) || regex.test(item.title.ru)
                        || regex.test(item.description.am) || regex.test(item.description.ru)
                }

            );
            setSearchResults(results);
        }else {
            setSearchResults(data)
        }

    },[data, search])
    return <div className="mx-auto w-full pb-16">
        {isLoading && <LoadingSpinner/>}
        <PageLayout withSearch={true} headerButtons={
            <div className="flex items-center w-full gap-2">
                <Input
                    defaultValue={search}
                    className='mr-2 flex-1 min-w-[150px]'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={{am: "Որոնել", ru: 'Поиск'}}
                />
                <Button title={ADD_BUTTON} onClick={() => router.push("/admin/main/products/add")} variant="primary"></Button>
                <ToItemPageButton link={`/main/products`}/>
            </div>
        } headerTitle={PRODUCTS}>
            <>
                {!searchResults?.length && !isLoading && <div className='flex justify-center text-lg'>Продукты не найдены.</div>}
                {!!searchResults?.length && <div className='grid grid-cols-12 mx-5'>
                    {
                        searchResults?.map((item) => <ProductTemplate
                            className='col-span-12 lg:col-span-6 xl:col-span-4'
                            key={item._id}
                            item={item}/>)
                    }
                </div>}
            </>
        </PageLayout>
    </div>
}
