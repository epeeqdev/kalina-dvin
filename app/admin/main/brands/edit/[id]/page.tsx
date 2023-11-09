'use client'
import {useParams} from "next/navigation";
import {BrandForm} from "@/app/admin/main/brands/components/brand-form";



export default function EditCategory(){
    const {id} = useParams();
    return <BrandForm id={id as string}/>
}