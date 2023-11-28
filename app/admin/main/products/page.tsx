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
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";

export default function ProductsPage() {
    const {searchParams, pushQueryString} = useQueryString()
    const {data, isLoading, refetch} = useQuery<ProductResponseDTO[]>(getProducts, [], {fetchOnMount: false});
    const [search, setSearch] = useDebouncedState(searchParams.get('search') ?? '');

    const router = useRouter()

    useEffect(() => {
        const params = pushQueryString('search', search);
        refetch(params as any)
    }, [search])

    return <div className="mx-auto w-full pb-16">
        {isLoading && <LoadingSpinner/>}
        <PageLayout headerButtons={
            <div className="flex items-center">
                <Input
                    defaultValue={search}
                    className='mx-2 w-[60vw]'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search'
                />
                <Button onClick={() => router.push("/admin/main/products/add")} variant="primary">Добавить </Button>
            </div>
        } headerTitle={"Продукты"}>
            <>
                {!data?.length && !isLoading && <div className='flex justify-center text-lg'>Продукты не найдены.</div>}
                {!!data?.length && <div className='grid grid-cols-12 mx-5'>
                    {
                        data?.map((item) => <ProductTemplate
                            className='col-span-12 lg:col-span-6 xl:col-span-4'
                            key={item._id}
                            item={item}/>)
                    }
                </div>}
            </>
        </PageLayout>
    </div>
}
