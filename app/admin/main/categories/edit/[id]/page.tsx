'use client'
import {useParams} from "next/navigation";
import AddCategoryPage from "@/app/admin/main/categories/add/addCategoryPage";

export default function EditCategory(){
    const {id} = useParams();
    return <div>
        <AddCategoryPage id={id}/>
    </div>
}