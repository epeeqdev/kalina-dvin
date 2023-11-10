"use client"

import {useQuery} from "@/utils/hooks/useQuery";
import {AttributesResponseDTO, BrandResponseDTO} from "@/backend/types";
import axios from "@/axios";
import LoadingSpinner from "@/components/controls/loading-spinner";
import Link from "next/link";
import {Button} from "@/app/admin/main/components/controls/button";
import AttributeTemplate from "@/app/admin/main/attributes/halpers/attributeTemplate";
export default function Attributes() {

    const {
        data: attributes,
        isLoading: attributesLoading
    } = useQuery<AttributesResponseDTO>(() => axios.get(`/api/attributes`));

    return (
        <div className="xl:w-[60%] mx-auto w-full pb-16">
            <div className="text-3xl">Атрибуты</div>
            <div className={"flex justify-end mb-5"}>
                <Link href="/admin/main/attributes/add">
                    <Button variant="primary">Добавить Атрибуты</Button>
                </Link>
            </div>
            {attributes?.map((item) => {
                return (
                    <AttributeTemplate
                        item={item}
                        key={item._id}
                    />
                )
            })
            }
            {attributesLoading && <LoadingSpinner/>}
        </div>
    )
}