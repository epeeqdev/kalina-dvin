"use client"

import BrandTemplate from "@/app/admin/main/brands/helpers/brandTemplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {BrandResponseDTO} from "@/backend/types";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {getBrands} from "@/app/admin/main/brands/helpers/getBrands";
import {Draggable} from "@/app/admin/main/drag-and-drop/draggable";
import {Droppable} from "@/app/admin/main/drag-and-drop/droppable";
import {DroppableArgs} from "@/app/admin/main/drag-and-drop/types";
import {getReorderedItems} from "@/app/admin/main/drag-and-drop/utils/getReorderedItems";
import {useState} from "react";

export default function Brands() {


    const router = useRouter()
    const [ReorderedBrands, setReorderedBrands] = useState<BrandResponseDTO[]>()


    const {
        data: brands,
        isLoading: BrandsLoading
    } = useQuery<BrandResponseDTO[]>(getBrands);

    const handleDrop = (args: DroppableArgs) => {
        setReorderedBrands((prev) => {
            return getReorderedItems(prev || brands, args)
        });
    };

    return (
        <div className="mx-auto w-full pb-16">

            <PageLayout headerButtons={
                <>
                    {ReorderedBrands && <Button onClick={() => {
                    }} variant="secondary">Сохранить порядок</Button>}
                    {ReorderedBrands &&
                        <Button onClick={() => setReorderedBrands(null)} variant="alert">Отменить</Button>}
                    <Button onClick={() => router.push("/admin/main/brands/add")} variant="primary">Добавить
                        Бренд</Button>
                </>
            } headerTitle={"Бренды"}
            >
                <div className="px-5">
                <div className="px-5 grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-2">
                    {(ReorderedBrands ? ReorderedBrands : brands)?.map((item) => {
                        return (
                            <Droppable id={item._id} key={item._id} onDrop={(args) => handleDrop(args)}>
                                <Draggable id={item._id}>
                                    <BrandTemplate
                                        item={item}
                                        key={item._id}
                                    />
                                </Draggable>
                            </Droppable>

                            )
                        })
                        }
                        {BrandsLoading && <LoadingSpinner/>}
                    </div>
                </div>
            </PageLayout>
        </div>
    )
}