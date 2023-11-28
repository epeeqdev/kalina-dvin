'use client'
import clsx from "clsx";
import {CategoryResponseDTO} from "@/backend/types";
import {useRouter} from "next/navigation";

interface Props {
    item: CategoryResponseDTO[0];
    className?: string;
}

export const CategoryTemplate = ({item, className}: Props) => {
    const router = useRouter()

    return (
        <div onClick={() => router.push(`/admin/main/categories/edit/${item._id}`)} className={clsx(`w-full bg-white hover:bg-[#eeeeee] transition flex gap-[2%] py-2 px-2 cursor-grab active:cursor-grabbing`, className)}>
            <div className='relative'>
                <img className='w-[30px] h-[30px] min-w-[30px] object-contain bg-[#dadada] rounded left-0 top-0' src={item?.image?.src} alt="photo"/>
            </div>
            <div className='pr-4'>
                <h3 className='text-[16px] mb-1'>{item.name.ru}</h3>
            </div>
        </div>
    )
}
