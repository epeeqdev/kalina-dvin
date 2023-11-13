"use client"
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {CategoryResponseDTO} from "@/backend/types";
import axios from "@/axios";
import LoadingSpinner from "@/components/controls/loading-spinner";
import Link from "next/link";
import {Button} from "@/app/admin/main/components/controls/button";

export default function Categories() {

    const {
        data: categories,
        isLoading: categoriesLoading
    } = useQuery<CategoryResponseDTO[]>(() => axios.get(`/api/categories`));

    return (
        <div className="xl:w-[60%] mx-auto w-full pb-16">
            <div className="text-3xl">Категории</div>
            <div className={"flex justify-end mb-5"}>
                <Link href="/admin/main/categories/add">
                    <Button variant="primary">Добавить категорию</Button>
                </Link>
            </div>

            {categories?.map((item) => {
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