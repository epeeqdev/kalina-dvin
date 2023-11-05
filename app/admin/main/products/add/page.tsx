"use client"

import ProductForm from "@/app/admin/main/products/add/productForm";
import {useParams} from "next/navigation";


export default function Add() {
    const {id} = useParams()

    return (
        <ProductForm id={id}/>
    )
}
