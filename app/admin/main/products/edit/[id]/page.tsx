'use client'

import {useParams} from "next/navigation";



export default function EditProduct(){
	const {id} = useParams();
	return <div>
		Edit product {id}
	</div>
}
