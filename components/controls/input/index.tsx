import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<'input'> {
    label?: string;
    placeholder?: string
    className?: string;
    error?: string;
    required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(({label, className, required, error, ...props}: Props, ref) => {
    return <div>
        <label>
            <div className="flex">
                {label && <span className='text-[16px] mb-1 block text-dark-grey'>{label}</span>}
                {required && <span className="text-red-600">*</span>}
            </div>
            <input className={clsx('border px-4 py-2', {
                "outline-red-600 border-2 border-red-600": !!error
            }, className)} {...props} ref={ref}/>
            {!!error && <span className="text-red-600 text-sm">{error}</span>}
        </label>
    </div>
})
