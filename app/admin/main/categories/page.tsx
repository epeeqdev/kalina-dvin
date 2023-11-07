"use client"
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {BrandResponseDTO, CategoryResponseDTO} from "@/backend/types";
import axios from "@/axios";
import {useState} from "react";
import LoadingSpinner from "@/components/controls/loading-spinner";

export default function Categories(){

    const {data: categorieResponse, isLoading: categoriesLoading} = useQuery<CategoryResponseDTO>(() => axios.get(`/api/categories`));
    const categories = categorieResponse?.map(item => {
        return ({
            value: item._id,
            label: item.name.ru,
            image : item.image.src
        })
    }) ?? []

    console.log("categoriesResponse" , categories)
    return <div>
        {categories.map((item) => {
             return (
                 <CategoryTemplate item={item.label} className={"classname"} image={item.image.src} key={item.value}/>
             )
            })
        }
        {categoriesLoading && <LoadingSpinner/>}
    </div>
}