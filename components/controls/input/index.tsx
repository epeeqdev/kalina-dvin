import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";
import {useLanguage} from "../../../app/main/hooks/useLanguage";

interface Props extends ComponentPropsWithoutRef<'input'> {
    label?: {am: string, ru: string };
    placeholder?: {am: string, ru: string }
    className?: string;
    error?: {am: string, ru: string } | any;
    required?: boolean;
    inputClassName?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(({label, placeholder, className, required, error, ...props}: Props, ref) => {
    const { getLanguage } = useLanguage();
    return <div className={className}>
            <div className="flex">
                {label && <span className='text-[16px] mb-2 block text-dark-grey whitespace-nowrap'>{getLanguage({am: label.am, ru: label.ru})}</span>}
                {required && <span className="text-red-600">*</span>}
            </div>
            <input className={clsx('block border px-4 py-2 w-full', {
                "outline-red-600 border-2 border-red-600": !!error
            })} placeholder={getLanguage(placeholder)} {...props} ref={ref}
            />
            {!!error && <span className="text-red-600 text-sm">{getLanguage({am : error?.message?.am, ru: error?.message?.ru})}</span>}
    </div>
})
