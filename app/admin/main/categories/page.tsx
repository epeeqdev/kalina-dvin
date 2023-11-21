"use client"
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {CategoryResponseDTO} from "@/backend/types";
import axios from "@/axios";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";

export default function Categories() {

    const router = useRouter()

    const {
        data: categories,
        isLoading: categoriesLoading
    } = useQuery<CategoryResponseDTO[]>(() => axios.get(`/api/categories`));

    return (


        <div className="mx-auto w-full pb-16">
            <PageLayout headerButtons={
                <>
                    <Button onClick={() => router.push("/admin/main/categories/add")} variant="primary">Добавить категорию</Button>
                </>
            } headerTitle={"Категории"}>
                <div className="pl-5 pr-5">
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
            </PageLayout>
        </div>
    )
}