import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<'textarea'> {
    label?: string;
    placeholder?: string
    className?: string;
    error?: string;
    required?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(({label,required, className, error, ...props}: Props, ref) => {
    return <div>
        <div className="flex">
            {label && <span className='text-[16px] block text-dark-grey'>{label}</span>}
            {required && <span className="text-red-600">*</span>}
        </div>
        <textarea className={clsx('border px-4 py-2 max-h-[200px] min-h-[50px]', {
            "outline-red-600 border-2 border-red-600": !!error
        }, className)} {...props} ref={ref}/>
        {!!error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
})
