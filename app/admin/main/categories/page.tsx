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
import {ADD_CATEGORIES_BUTTON, CANCEL_BUTTON, CATEGORIES, SAVE_BUTTON} from "../costants";

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
                    {reorderedCategories && <Button title={SAVE_BUTTON} onClick={handleUpdateCategories} variant="secondary"></Button>}
                    {reorderedCategories && <Button title={CANCEL_BUTTON} onClick={() => setReorderedCategories(null)} variant="alert"></Button>}
                    <Button title={ADD_CATEGORIES_BUTTON} onClick={() => router.push("/admin/main/categories/add")} variant="primary"></Button>
                    <Link href={"/main#categories-part"} target="_blank">
                        <ToItemPageButton/>
                    </Link>
                </>

            } headerTitle={CATEGORIES}>
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