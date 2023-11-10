"use client"

import {useParams} from "next/navigation";
import ProductForm from "@/app/admin/main/products/components/productForm";


export default function Add() {
    const {id} = useParams()

    return (
        <ProductForm id={id as string}/>
    )
}
