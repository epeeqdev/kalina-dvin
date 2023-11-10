'use client'

import {useParams} from "next/navigation";
import {CategoryForm} from "@/app/admin/main/categories/components/category-form";

export default function EditCategory(){
    const {id} = useParams();
    return <CategoryForm id={id as string}/>
}