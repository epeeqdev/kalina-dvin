import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";
import IconComponent from "@/components/icon";
import {useLanguage} from "@/app/main/hooks/useLanguage";

interface Props extends ComponentPropsWithoutRef<'input'> {
    label?: string;
    placeholder?: string
    className?: string;
    error?: string | any;
    inputClassName?: string
}
const translates = {
    search: {
        am: 'Որոնել',
        ru: 'Поиск'
    }
}
export const Input = forwardRef<HTMLInputElement, Props>(({label, className, error, ...props}: Props, ref) => {
    const {getLanguage} = useLanguage()
    return <div className={className}>
        <div className='relative'>
            <input className={clsx('w-full max-w-[800px] block border border-primary rounded-none focus-visible:rounded-none focus-visible:outline-none py-2  pl-9', {
                "outline-red-600 border-2 border-red-600": !!error
            })} {...props} ref={ref} placeholder={getLanguage(translates.search)}
            />
            <IconComponent name='search' color='secondary' className='absolute top-1/2 transform -translate-y-1/2 left-[12px]'/>
        </div>

        {!!error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
})