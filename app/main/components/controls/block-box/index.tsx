'use client'
import {ComponentPropsWithoutRef} from "react";
import {Typography} from "@/app/main/components/controls/typography";
import {LanguageType} from "@/app/main/components/controls/dropdown";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import clsx from "clsx";


interface Props extends ComponentPropsWithoutRef<'div'>{
    header: LanguageType,
    childrenClassName?: string
}

export const BlockBox = ({children, className, header,childrenClassName,...props}:Props) => {
    const {getLanguage} = useLanguage()
    return(
        <div className={clsx('flex flex-col items-start', className)}>
            <div className='px-[5%] mb-2 md:mb-6'>
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