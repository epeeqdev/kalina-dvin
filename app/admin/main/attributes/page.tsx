"use client"

import {useQuery} from "@/utils/hooks/useQuery";
import {AttributeDTO} from "@/backend/types";
import axios from "@/axios";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/app/admin/main/components/controls/button";
import AttributeTemplate from "@/app/admin/main/attributes/halpers/attributeTemplate";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";



export default function Attributes() {

    const router = useRouter()

    const {
        data: attributes,
        isLoading: attributesLoading
    } = useQuery<AttributeDTO[]>(() => axios.get(`/api/attributes`));

    return (
        <div className="mx-auto w-full pb-16">
            <PageLayout headerButtons={
                <>
                    <Button onClick={() => router.push("/admin/main/attributes/add")} variant="primary">Добавить Атрибут</Button>
                </>
            } headerTitle={"Атрибуты"} >
                <div className="px-5">
                    {attributes?.map((item) => {
                        return (
                            <AttributeTemplate
                                item={item}
                                key={item._id}
                            />
                        )
                    })
                    }
                </div>
                {attributesLoading && <LoadingSpinner/>}
            </PageLayout>
        </div>
    )
}