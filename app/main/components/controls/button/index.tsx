import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<'button'>{
}

export const Button = forwardRef<HTMLButtonElement, Props>(({children,className,...props}:Props, ref) => {
	return <button className={
		clsx('text-white px-4 active:bg-secondary-lighter transition-[background-color] py-1.5 md:py-2 lg:py-2.5 bg-secondary hover:bg-secondary-darker px-5 md:px-7 lg:px-9',
			className)} ref={ref} {...props}>
		{children}
	</button>
})
