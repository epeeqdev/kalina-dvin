'use client'
import {ComponentPropsWithoutRef} from "react";
import {Typography} from "@/app/main/components/controls/typography";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import clsx from "clsx";
import {TextStructure} from "@/backend/types";


interface Props extends ComponentPropsWithoutRef<'div'>{
    header: TextStructure,
    childrenClassName?: string
}

export const HomePageSection = ({children, className, header,childrenClassName}:Props) => {
    const {getLanguage} = useLanguage()
    return(
        <div className={clsx('flex flex-col items-start', className)}>
            <div className='px-[5%] mb-4 md:mb-8'>
            <div>
                <Typography size='4xl'>{getLanguage(header)}</Typography>
            </div>
            </div>
            <div className={clsx('w-full', childrenClassName)} >
                {children}
            </div>
        </div>
    )
}