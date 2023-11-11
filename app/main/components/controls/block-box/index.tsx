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
            <div className='border-b-2 border-primary flex'>
                <Typography
                    title={getLanguage(header)}
                    fontSize='text-base'
                    color='text-secondary'
                    fontWeight='font-normal'
                    className='md:text-[20px]'
                />
            </div>
            </div>
            <div className={clsx('w-full', childrenClassName)} >
                {children}
            </div>
        </div>
    )
}