import {ComponentPropsWithoutRef, forwardRef} from "react";
import clsx from "clsx";

interface Props {
	children?: string,
	className?: string,
	variant?: string
	type?: 'submit' | 'reset' | 'button' | undefined;
	onClick?: () => void
}

export const Button = forwardRef<HTMLButtonElement, Props>(({children,className,variant, type, onClick}:Props,) => {
	return <button
		onClick={onClick}
		type={type}
		className={
		clsx(
			{
				'bg-green-800 hover:bg-green-900 active:text-green-600 active:bg-white active:border active:border-green-600': variant === "primary" ,
				'bg-blue-800 hover:bg-blue-900 active:text-blue-600 active:bg-white active:border active:border-blue-600': variant === "secondary" ,
				'bg-red-800 hover:bg-red-900 active:text-red-600 active:bg-white active:border active:border-red-600': variant === "alert"
			},
			'border border-transparent px-4 text-white py-1.5 md:py-2',
			className)}>
		{children}
	</button>
})
