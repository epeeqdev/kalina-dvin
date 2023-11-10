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
        <div className={clsx('flex flex-col  gap-y-[34px] md:gap-y-[56px] items-center', className)}>
            <div className='w-[210px] md:w-[400px] border-b-2 border-primary flex justify-center pb-[12px] md:pb-[32px]'>
                <Typography
                    title={getLanguage(header)}
                    fontSize='text-lg'
                    color='text-secondary'
                    fontWeight='font-bold'
                    lineHeight='leading-6'
                    className='md:text-header md:leading-10'
                />
            </div>
            <div className={clsx('w-full', childrenClassName)} >
                {children}
            </div>
        </div>
    )
}