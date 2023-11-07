'use client'
import clsx from "clsx";
import {useRouter} from "next/navigation";

interface Props {
    item: any;
    className?: string;
    image : string
}

const descriptionStyles = {
    display: "-webkit-box",
    '-webkit-line-clamp': "2",
    '-webkit-box-orient': "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
};

export const CategoryTemplate = ({item, className, image}: Props) => {
    const router = useRouter()
    return (
        <div className={clsx(`w-full bg-white hover:bg-[#eeeeee] transition flex gap-[2%] py-2 px-2 cursor-pointer`, className)}>
            <div className='relative'>
                <img className='w-[30px] h-[30px] min-w-[30px] object-contain bg-[#dadada] rounded left-0 top-0' src={image} alt="photo"/>
            </div>
            <div className='pr-4'>
                <h3 className='text-[16px] mb-1'>{item}</h3>
            </div>
        </div>
    )
}
