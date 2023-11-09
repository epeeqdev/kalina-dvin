"use client"
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {CategoryResponseDTO} from "@/backend/types";
import axios from "@/axios";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/components/controls/button";
import Link from "next/link";

export default function Categories() {

    const {
        data: categories,
        isLoading: categoriesLoading
    } = useQuery<CategoryResponseDTO>(() => axios.get(`/api/categories`));

    console.log("categoriesResponse", categories)
    return (
        <div>
            <div className={"flex justify-end mb-5"}>
                <Link href="/admin/main/categories/add-category">
                    <Button className="">Добавить категорию</Button>
                </Link>
            </div>

            {categories?.map((item) => {
                console.log("item" , item)
                return (
                    <CategoryTemplate
                        item={item}
                        key={item._id}
                    />
                )
            })
            }
            {categoriesLoading && <LoadingSpinner/>}
        </div>
    )
}