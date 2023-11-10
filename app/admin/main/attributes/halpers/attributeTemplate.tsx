'use client'
import clsx from "clsx";
import {ProductAttributeResponseDTO} from "@/backend/types";
import Link from "next/link";

interface Props {
    item: ProductAttributeResponseDTO[0];
    className?: string;
}

export default function AttributeTemplate ({item, className}: Props){
    return (
        <Link href={`/admin/main/attributes/edit/${item._id}`} className={clsx(`w-full bg-white hover:bg-[#eeeeee] transition flex gap-2 py-2 px-2 cursor-pointer`, className)}>
            <div className='pr-4'>
                <h3 className='text-[16px] mb-1'>{item.name.ru}</h3>
            </div>
        </Link>
    )
}