"use client"
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {CategoryResponseDTO} from "@/backend/types";
import axios from "@/axios";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {Draggable} from "@/app/admin/main/drag-and-drop/draggable";
import {Droppable} from "@/app/admin/main/drag-and-drop/droppable";
import {DroppableArgs} from "@/app/admin/main/drag-and-drop/types";
import {getReorderedItems} from "@/app/admin/main/drag-and-drop/utils/getReorderedItems";
import {useState} from "react";

export default function Categories() {

    const {
        data: categories,
        isLoading: categoriesLoading
    } = useQuery<CategoryResponseDTO[]>(() => axios.get(`/api/categories`));

    const router = useRouter()
    const [reorderedCategories, setReorderedCategories] = useState<CategoryResponseDTO[]>()

    const handleDrop = (args: DroppableArgs) => {
        setReorderedCategories((prev) => {
            return getReorderedItems(prev || categories, args)
        });
    };


    return (


        <div className="mx-auto w-full pb-16">
            <PageLayout headerButtons={
                <>
                    {reorderedCategories && <Button onClick={() => {}} variant="secondary">Сохранить порядок</Button>}
                    {reorderedCategories && <Button onClick={() => setReorderedCategories(null)} variant="alert">Отменить</Button>}
                    <Button onClick={() => router.push("/admin/main/categories/add")} variant="primary">Добавить категорию</Button>
                </>

            } headerTitle={"Категории"}>
                    <div className="pl-5 pr-5 grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-2">
                        {(reorderedCategories ? reorderedCategories : categories)?.map((item) => {
                            return (
                                <Droppable id={item._id} key={item._id} onDrop={(args) => handleDrop(args)}>
                                    <Draggable id={item._id}>
                                        <CategoryTemplate
                                            item={item}
                                        />
                                    </Draggable>
                                </Droppable>
                            )
                        })
                        }

                    {categoriesLoading && <LoadingSpinner/>}
                </div>
            </PageLayout>
        </div>
    )
}