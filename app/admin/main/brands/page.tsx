"use client"


import BrandTemplate from "@/app/admin/main/brands/halpers/brandTemplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {BrandResponseDTO} from "@/backend/types";
import axios from "@/axios";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/components/controls/button";
import Link from "next/link";

export default function Brands() {

    const {
        data: brands,
        isLoading: BrandsLoading
    } = useQuery<BrandResponseDTO>(() => axios.get(`/api/brands`));

    return (
        <div>
            <div className={"flex justify-end mb-5"}>
                <Link href="/admin/main/brands/add">
                    <Button className="bg-green-800 hover:bg-green-900">Добавить Бренд</Button>
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