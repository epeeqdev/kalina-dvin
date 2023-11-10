'use client'

import {useEffect} from "react";
import {getProducts} from "@/app/admin/main/products/helpers/showProducts";
import {ProductTemplate} from "@/components/product";
import {Input} from "@/components/controls/input";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {useDebouncedState} from "@/utils/hooks/useDebouncedState";
import {useQuery} from "@/utils/hooks/useQuery";
import {useQueryString} from "@/utils/hooks/useQueryString";
import {ProductResponseDTO} from "@/backend/types";

export default function ProductsPage() {
	const {searchParams, pushQueryString} = useQueryString()
	const {data, isLoading, refetch} = useQuery<ProductResponseDTO[]>(getProducts, [], {fetchOnMount: false});
	const [search, setSearch] = useDebouncedState(searchParams.get('search') ?? '');

	useEffect(() => {
			const params = pushQueryString('search', search);
			refetch(params as any)
	},[search])

	return <div className="mx-auto w-full pb-16">
		{isLoading && <LoadingSpinner/>}
		<Input defaultValue={search} className='w-full mb-5' onChange={(e) => setSearch(e.target.value)} placeholder='Search'/>
		{!data?.length && !isLoading && <div className='flex justify-center text-lg'>Продукты не найдены.</div>}
		{!!data?.length &&<div className='grid grid-cols-12'>
			{
				data?.map((item) => <ProductTemplate
					className='col-span-12 lg:col-span-6 xl:col-span-4'
					key={item._id}
					item={item}/>)
			}
		</div>}
	</div>
}
