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
import React, {useState} from "react";
import {updateOrderBrands} from "@/app/admin/main/brands/helpers/updateOrderBrands";
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";
import Link from "next/link";

export default function Brands() {

    const {
        data: brands,
        isLoading: BrandsIsLoading,
        refetch,
    } = useQuery<BrandResponseDTO[]>(getBrands);

    const router = useRouter()
    const [reorderedBrands, setReorderedBrands] = useState<BrandResponseDTO[]>(null)
    const handleUpdateOrderBrands = async () => {
        if(reorderedBrands) {
            const data = reorderedBrands.map((item) => item._id)
            await updateOrderBrands(data);
            await refetch();
            setReorderedBrands(null);
        }
    }

    const handleDrop = (args: DroppableArgs) => {
        setReorderedBrands((prev) => {
            return getReorderedItems(prev || brands, args)
        });
    };

    return (
        <div className="mx-auto w-full pb-16">

            <PageLayout headerButtons={
                <>
                    {reorderedBrands &&
                        <>
                            <Button onClick={handleUpdateOrderBrands} variant="secondary">Сохранить порядок</Button>
                            <Button onClick={() => setReorderedBrands(brands)} variant="alert">Отменить</Button>
                    </>}

                    <Button onClick={() => router.push("/admin/main/brands/add")} variant="primary">Добавить Бренд</Button>
                    <Link href={"/main#brands-part"} target="_blank">
                        <ToItemPageButton/>
                    </Link>
                </>
            } headerTitle={"Бренды"}
            >
                {(!brands || !brands[0]) && !BrandsIsLoading && <div className="text-lg flex justify-center">Бренды не найдены.</div>}
                <div className="px-5 grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-2">
                    {(reorderedBrands ? reorderedBrands : brands)?.map((item) => {
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
                    {BrandsIsLoading && <LoadingSpinner/>}
                </div>
            </PageLayout>
        </div>
    )
}