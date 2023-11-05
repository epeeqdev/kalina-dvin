'use client'

import {useEffect, useState} from "react";
import {getProducts} from "@/app/admin/main/products/helpers/showProducts";
import {ProductTemplate} from "@/components/product/page";
import {Product} from "@/app/admin/main/products/types";
import {Input} from "@/components/controls/input";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {useRouter, useSearchParams} from "next/navigation";

export default function ProductsPage() {

	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const search = useSearchParams()

	const showProducts = async () => {
		setLoading(true)
		const response = await getProducts(search);
		if (response?.data) {
			setProducts(response.data)
		}
		setLoading(false);
	}

	useEffect(() => {
		showProducts();
	}, [])
	if(isLoading) return <LoadingSpinner/>;
	if (!products?.length) return <div className='flex justify-center text-lg'>Пока продуктов нет.</div>
	return <div className='pt-4'>
		<Input className='w-full mb-5' placeholder='Search'/>
		<div className='grid grid-cols-12'>
			{
				products.map((item) => <ProductTemplate className='col-span-12 lg:col-span-6 xl:col-span-4' key={item._id}
				                                        item={item}/>)
			}
		</div>
	</div>
}
