"use client"

import BrandTemplate from "@/app/admin/main/brands/helpers/brandTemplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {BrandResponseDTO} from "@/backend/types";
import axios from "@/axios";
import LoadingSpinner from "@/components/controls/loading-spinner";
import Link from "next/link";
import {Button} from "@/app/admin/main/components/controls/button";
export default function Brands() {

    const {
        data: brands,
        isLoading: BrandsLoading
    } = useQuery<BrandResponseDTO>(() => axios.get(`/api/brands`));

    return (
        <div className="xl:w-[60%] mx-auto w-full pb-16">
            <div className="text-3xl">Бренды</div>
            <div className={"flex justify-end mb-5"}>
                <Link href="/admin/main/brands/add">
                    <Button variant="primary">Добавить Бренд</Button>
                </Link>
            </div>
            {brands?.map((item) => {
                return (
                    <BrandTemplate
                        item={item}
                        key={item._id}
                    />
                )
            })
            }
            {BrandsLoading && <LoadingSpinner/>}
        </div>
    )
}