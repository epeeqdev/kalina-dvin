'use client'

import {useEffect, useState} from "react";
import {getProducts} from "@/app/admin/main/products/helpers/showProducts";
import {ProductTemplate} from "@/components/product/page";
import {Product} from "@/app/admin/main/products/types";

export default function ProductsPage(){

const [products , setProducts] = useState<Product[]>([])
	const showProducts = async () => {
		const response = await getProducts();
		if(response?.data){
			setProducts(response.data)
		}
	}

	useEffect(() => {
		showProducts();
	},[])


	return <div className='flex flex-wrap gap-3'>
		{
			products.map((item) => <ProductTemplate key={item._id} item={item}/>)
		}
	</div>
}
