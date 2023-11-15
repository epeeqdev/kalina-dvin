"use client"
import AboutForm from "@/app/admin/main/about-us/components/about-form";
import {useParams} from "next/navigation";

export default function AboutUs(){
    const {id} = useParams()
    return <AboutForm id={id as string} />
}