'use client'
import Link from 'next/link'
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Typography} from "@/components/controls/typography";
import clsx from "clsx";
import IconComponent from "@/components/icon";

export const Index = ({items}: any) => {
    const { getLanguage } = useLanguage();
    return(
        <div className={clsx([ 'flex flex-col'])}>
            {items.map((el: any) => (
                <Link href='#' key={el.id} className='flex items-center gap-x-[6px] lg:gap-x-[12px]'>
                    {el.icon && <IconComponent name={el?.icon} size={{width: 10, height: 10}} color='primary'/>}
                    <Typography title={getLanguage(el.title)} fontSize='text-medium' color='text-white' className='lg:text-base flex-1' lineHeight='leading-[9.6px]'/>
                </Link>
            ))}
        </div>
    )
}