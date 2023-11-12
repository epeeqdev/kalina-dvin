'use client'
import Link from 'next/link'
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Typography} from "@/app/main/components/controls/typography";
import clsx from "clsx";
import IconComponent from "@/components/icon";

export const FooterBlogs = ({items}: any) => {
    const { getLanguage } = useLanguage();
    return(
        <div className={clsx('flex flex-col flex-1 gap-y-[12px] lg:gap-y-[12px]')}>
            {items.map((el: any) => (
                <Link href='#' key={el.id} className='flex items-center gap-x-[6px] lg:gap-x-[12px]'>
                    {el.icon && <IconComponent name={el?.icon} color='primary' className='w-[10px] h-[14px] lg:w-[18px] lg:h-[18px] xl:w-[24px] xl:h-[24px]'/>}
                    <Typography size='xl' color='white' className='flex-1'>{getLanguage(el.title)}</Typography>
                </Link>
            ))}
        </div>
    )
}