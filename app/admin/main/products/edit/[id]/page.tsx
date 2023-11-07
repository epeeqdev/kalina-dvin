'use client'

import {useParams} from "next/navigation";
import ProductForm from "@/app/admin/main/products/components/productForm";



export default function EditProduct(){
	const {id} = useParams();

	return <div>
		<ProductForm id={id as string} />
	</div>
}
