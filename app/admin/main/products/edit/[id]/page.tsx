'use client'

import {useParams} from "next/navigation";
import ProductForm from "@/app/admin/main/products/add/productForm";



export default function EditProduct(){
	const {id} = useParams();

	return <div>
		<ProductForm id={id} />
	</div>
}
