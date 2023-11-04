'use client'
import {Product} from "@/app/admin/main/products/types";

interface Props {
    item: Product
}

export const ProductTemplate = ({item}: Props) => {
    console.log(item , "item item item mmm")
    return (
            <div className='w-full bg-white hover:bg-[#eeeeee] transition flex gap-[2%] py-2 px-2'>
                <div className='relative'>
                    <img className='w-[150px] h-[150px] min-w-[150px] object-contain bg-[#dadada] rounded left-0 top-0' src={item.images[0]?.src} alt="photo"/>
                </div>
                <div className='pr-4'>
                    <h3 className='text-[21px] mb-2'>{item.title}</h3>
                    <div className='text-[14px] text-grey'>{item.description}</div>
                </div>
            </div>
    )
}

