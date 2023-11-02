import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<'input'> {
    label?: string;
    placeholder?: string
    className?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({label, className, error, ...props}: Props, ref) => {
    return <div>
        <label>
            {label && <span className='text-[16px] mb-1 block text-dark-grey'>{label}</span>}
            <input className={clsx('border px-4 py-2', {
                "outline-red-600 border-2 border-red-600 rounded": !!error
            }, className)} {...props} ref={ref}/>
            {!!error && <span className="text-red-600">{error}</span>}
        </label>
    </div>
})
