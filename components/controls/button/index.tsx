import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<'button'>{
}

export const Button = forwardRef<HTMLButtonElement, Props>(({children,className,...props}:Props, ref) => {
	return <button className={
		clsx('border border-primary px-4 active:text-primary ' +
			'active:bg-white py-1.5 md:py-2 lg:py-2.5 text-medium md:text-xs lg:text-base text-white hover:text-primary bg-primary ' +
			'hover:bg-white hover:shadow-md transition active:shadow-inner ' +
			'px-5 md:px-7 lg:px-9',
			className)} ref={ref} {...props}>
		{children}
	</button>
})
