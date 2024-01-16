import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";
import { useLanguage } from "@/app/main/hooks/useLanguage";

interface Props extends ComponentPropsWithoutRef<'textarea'> {
    label?: {am: string, ru: string};
    placeholder?: {am: string, ru: string}
    className?: string;
    error?: any;
    required?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(({
     label, required, placeholder, className, error, ...props} : Props, ref) => {
    const { getLanguage } = useLanguage();
    return (
        <div className="mb-5">
            <div className="flex">
                {label && <span className='text-[16px] block text-dark-grey mb-2'>{getLanguage(label)}</span>}
                {required && <span className="text-red-600">*</span>}
            </div>
            <textarea placeholder={getLanguage(placeholder)} className={clsx('border w-full px-4 py-2 min-h-[100px] max-h-[400px]', {
                "outline-red-600 border-2 border-red-600": !!error
            }, className)} {...props} ref={ref}/>
            {!!error && <span className="text-red-600 text-sm">{getLanguage({am : error?.message?.am, ru: error?.message?.ru})}</span>}
        </div>
    )
})
