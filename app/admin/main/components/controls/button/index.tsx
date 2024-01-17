import {forwardRef, ReactNode} from "react";
import clsx from "clsx";
import {useLanguage} from "../../../../../main/hooks/useLanguage";

interface Props {
	title?: {am: string, ru: string}
	children?: ReactNode,
	className?: string,
	variant?: string
	type?: 'submit' | 'reset' | 'button' | undefined;
	onClick?: () => void
}

export const Button = forwardRef<HTMLButtonElement, Props>(({title, children,className,variant='primary', type, onClick}:Props,) => {
	const { getLanguage } = useLanguage();

	return <button
		onClick={onClick}
		type={type}
		className={
		clsx(
			{
				'border-green-700 hover:bg-green-700 hover:text-white transition rounded text-green-700 active:text-green-600 active:bg-white active:border active:border-green-600': variant === "primary" ,
				'border-blue-700 hover:bg-blue-700 hover:text-white transition rounded text-blue-900 active:text-blue-600 active:bg-white active:border active:border-blue-600': variant === "secondary" ,
				'border-red-700 hover:bg-red-700 hover:text-white transition rounded text-red-900 active:text-red-600 active:bg-white active:border active:border-red-600': variant === "alert"
			},
			'border px-4 py-1 whitespace-nowrap flex justify-center items-center',
			className)}>
		{getLanguage(title)}
		{children}
	</button>
})
