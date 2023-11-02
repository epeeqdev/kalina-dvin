import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<'button'>{
}

export const Button = forwardRef<HTMLButtonElement, Props>(({children,className,...props}:Props, ref) => {
	return <button className={clsx('border border-grey px-4 py-2 text-[14px] bg-white hover:bg-[#eeeeee] transition', className)} ref={ref} {...props}>
		{children}
	</button>
})
