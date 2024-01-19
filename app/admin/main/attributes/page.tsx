"use client"

import {useQuery} from "@/utils/hooks/useQuery";
import {AttributeDTO} from "@/backend/types";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {Button} from "@/app/admin/main/components/controls/button";
import AttributeTemplate from "@/app/admin/main/attributes/halpers/attributeTemplate";
import {useRouter} from "next/navigation";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {getAttributes} from "@/app/admin/main/attributes/halpers/getAttributes";
import {ADD_ATTRIBUTE_BUTTON, ADD_ATTRIBUTES, ATTRIBUTES, ATTRIBUTES_NOT_FOUND} from "../costants";
import { useLanguage } from "@/app/main/hooks/useLanguage";



export default function Attributes() {
    const {getLanguage} = useLanguage()

    const router = useRouter()

    const {
        data: attributes,
        isLoading: attributesLoading
    } = useQuery<AttributeDTO[]>(getAttributes);

    return (
        <div className="mx-auto w-full pb-16">
            <PageLayout headerButtons={
                <>
                    <Button title={ADD_ATTRIBUTE_BUTTON} onClick={() => router.push("/admin/main/attributes/add")} variant="primary"></Button>
                </>
            } headerTitle={ATTRIBUTES} >
                {(!attributes || !attributes[0]) && !attributesLoading && <div className="text-lg flex justify-center">{getLanguage(ATTRIBUTES_NOT_FOUND)}</div>}
                <div className="px-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {attributes?.map((item) => {
                        return (
                            <AttributeTemplate
                                item={item}
                                key={item._id}
                                className="whitespace-nowrap"
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