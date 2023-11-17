'use client'

import {useEffect} from "react";
import {getProducts} from "@/app/admin/main/products/helpers/getProducts";
import {ProductTemplate} from "@/components/product";
import {Input} from "@/components/controls/input";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {useDebouncedState} from "@/utils/hooks/useDebouncedState";
import {useQuery} from "@/utils/hooks/useQuery";
import {useQueryString} from "@/utils/hooks/useQueryString";
import {ProductResponseDTO} from "@/backend/types";
import Link from "next/link";
import {Button} from "@/app/admin/main/components/controls/button";

export default function ProductsPage() {
    const {searchParams, pushQueryString} = useQueryString()
    const {data, isLoading, refetch} = useQuery<ProductResponseDTO[]>(getProducts, [], {fetchOnMount: false});
    const [search, setSearch] = useDebouncedState(searchParams.get('search') ?? '');

    useEffect(() => {
        const params = pushQueryString('search', search);
        refetch(params as any)
    }, [search])

    return <div className="mx-auto w-full pb-16">
        {isLoading && <LoadingSpinner/>}
        <div className="bg-white text-white w-full h-16 flex items-center z-30 fixed top-0">
            <Link href="/admin/main/products/add">
                <Button variant="primary" className="fixed right-5 top-3">Добавить Продукт</Button>
            </Link>
        </div>
        <Input defaultValue={search} className='w-full mb-5' onChange={(e) => setSearch(e.target.value)}
               placeholder='Search'/>
        {!data?.length && !isLoading && <div className='flex justify-center text-lg'>Продукты не найдены.</div>}
        {!!data?.length && <div className='grid grid-cols-12'>
            {
                data?.map((item) => <ProductTemplate
                    className='col-span-12 lg:col-span-6 xl:col-span-4'
                    key={item._id}
                    item={item}/>)
            }
        </div>}
    </div>
}
