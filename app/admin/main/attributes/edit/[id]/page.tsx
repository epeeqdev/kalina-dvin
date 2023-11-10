'use client'
import {useParams} from "next/navigation";
import {AttributeForm} from "@/app/admin/main/attributes/components/attribute-form";



export default function EditAttribute(){
    const {id} = useParams();

    return <AttributeForm id={id as string}/>
}