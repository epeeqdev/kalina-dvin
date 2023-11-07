import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<'textarea'> {
    label?: string;
    placeholder?: string
    className?: string;
    error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(({label, className, error, ...props}: Props, ref) => {
    return <div>
        {label && <span className='text-[16px] block text-dark-grey'>{label}</span>}
        <textarea className={clsx('border px-4 py-2 max-h-[200px] min-h-[50px]', {
            "outline-red-600 border-2 border-red-600 rounded": !!error
        }, className)} {...props} ref={ref}/>
        {!!error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
})
