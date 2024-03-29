'use client'
import clsx from "clsx";
import {CategoryResponseDTO} from "@/backend/types";
import {useRouter} from "next/navigation";
import IconComponent from "../../../components/icon";
import {CustomImage} from "@/app/components/image";
import { useLanguage } from "@/app/main/hooks/useLanguage";

interface Props {
    item: CategoryResponseDTO;
    className?: string;
    shownInMainPage?: boolean
}

export default function BrandTemplate ({item, className, shownInMainPage}: Props){

    const { getLanguage } = useLanguage();

    const router = useRouter()
    return (
        <div onClick={() => router.push(`/admin/main/brands/edit/${item._id}`)} className={clsx(`w-full bg-white hover:bg-[#eeeeee] transition flex gap-[2%] py-2 px-2 cursor-pointer`, className)}>
            <div className='relative'>
                <CustomImage className='w-[30px] h-[30px] min-w-[30px] object-contain bg-[#dadada] rounded left-0 top-0' src={item?.image?.src} alt="photo" />
            </div>
            <div className=" flex justify-between w-full items-center">
                <div className='pr-4'>
                    <h3 className='text-[16px] mb-1'>{getLanguage({am: item.name.am, ru: item.name.ru})}</h3>
                </div>
                {!shownInMainPage && <IconComponent name="isDraggable" className="cursor-grab active:cursor-grabbing"/>}
            </div>
        </div>
    )
}
