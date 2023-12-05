'use client'
import clsx from "clsx";
import {useRouter} from "next/navigation";
import {ProductResponseDTO} from "@/backend/types";

interface Props {
    item: ProductResponseDTO;
    className?: string;
}

const descriptionStyles = {
    display: "-webkit-box",
    '-webkit-line-clamp': "2",
    '-webkit-box-orient': "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
};

export const ProductTemplate = ({item, className}: Props) => {
    const router = useRouter()
    return (
            <div onClick={() => router.push(`/admin/main/products/edit/${item._id}`)} className={clsx(`w-full bg-white hover:bg-[#eeeeee] transition flex gap-[2%] py-2 px-2 cursor-pointer overflow-hidden`, className)}>
                <div className='relative'>
                    <img className='w-[150px] h-[150px] min-w-[150px] object-contain bg-[#dadada] rounded left-0 top-0' src={item.images?.[0]?.src} alt="photo"/>
                </div>
                <div className='pr-4'>
                    <p className='text-[#666060] text-[12px]'>{item.brand?.name?.ru}</p>
                    <h3 className='text-[16px] mb-1'>{item.title.ru}</h3>
                    <div className='text-[12px] text-grey' style={descriptionStyles}>{item.description.ru}</div>
                    <div className='mt-1 text-[11px] text-grey'>{item.attributes.map((attribute, index) => <div key={attribute?._id}><span className="font-bold  ">{attribute.attribute?.name?.ru}</span> : {attribute.value.ru}{index !== item.categories.length-1 && ', '}</div>)}</div>
                </div>
            </div>
    )
}

