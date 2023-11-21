"use client"

import BrandTemplate from "@/app/admin/main/brands/helpers/brandTemplate";
import {useQuery} from "@/utils/hooks/useQuery";
import {BrandResponseDTO} from "@/backend/types";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {getBrands} from "@/app/admin/main/brands/helpers/getBrands";
export default function Brands() {


    const router = useRouter()

    const {
        data: brands,
        isLoading: BrandsLoading
    } = useQuery<BrandResponseDTO>(getBrands);

    return (
        <div className="mx-auto w-full pb-16">

            <PageLayout headerButtons={
                <>
                    <Button onClick={() => router.push("/admin/main/brands/add")} variant="primary">Добавить Бренд</Button>
                </>
            } headerTitle={"Бренды"}
            >
                <div className="px-5">
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
            </PageLayout>
        </div>
    )
}