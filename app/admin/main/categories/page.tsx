"use client"
import {CategoryTemplate} from "@/app/admin/main/categories/halpers/categoryTamplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {CategoryResponseDTO} from "@/backend/types";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {Draggable} from "@/app/admin/main/drag-and-drop/draggable";
import {Droppable} from "@/app/admin/main/drag-and-drop/droppable";
import {DroppableArgs} from "@/app/admin/main/drag-and-drop/types";
import {getReorderedItems} from "@/app/admin/main/drag-and-drop/utils/getReorderedItems";
import {useState} from "react";
import {getCategories} from "@/app/admin/main/categories/halpers/getCategories";
import {updateOrderCategories} from "@/app/admin/main/categories/halpers/updateOrderCategories";
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";
import Link from "next/link";

export default function Categories() {

    const {
        data: categories,
        isLoading: categoriesLoading,
        refetch
    } = useQuery<CategoryResponseDTO[]>(getCategories);


    const router = useRouter()
    const [reorderedCategories, setReorderedCategories] = useState<CategoryResponseDTO[] >(null)
    const handleUpdateCategories = async () => {
        if(reorderedCategories) {
            const data = reorderedCategories.map((item) => item._id)
            await updateOrderCategories(data);
            await refetch();
            setReorderedCategories(null);
        }
    }
    const handleDrop = (args: DroppableArgs) => {
        setReorderedCategories((prev) => {
            return getReorderedItems(prev || categories, args)
        });
    };

    return (

        <div className="mx-auto w-full pb-16">
            <PageLayout headerButtons={
                <>
                    {reorderedCategories && <Button onClick={handleUpdateCategories} variant="secondary">Сохранить порядок</Button>}
                    {reorderedCategories && <Button onClick={() => setReorderedCategories(null)} variant="alert">Отменить</Button>}
                    <Button onClick={() => router.push("/admin/main/categories/add")} variant="primary">Добавить категорию</Button>
                    <Link href={"/main#categories-part"} target="_blank">
                        <ToItemPageButton/>
                    </Link>
                </>

            } headerTitle={"Категории"}>
                {(!categories || !categories[0]) && !categoriesLoading && <div className="text-lg flex justify-center">Категории не найдены.</div>}
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