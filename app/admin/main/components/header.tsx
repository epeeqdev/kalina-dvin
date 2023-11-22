import {ReactNode} from "react";

interface Props {
    children?: ReactNode,
    title?: string
}
export default function Header({children, title}: Props){
    return (
        <div className="flex flex-0 flex-wrap items-center justify-between z-[30] bg-white py-5 shadow-sm relative">
            <div className="flex gap-4 flex-wrap-reverse justify-between w-full px-5">
                <div className='mx-auto flex-1 whitespace-nowrap flex items-center'>
                    <h1 className="text-xl">{title}</h1>
                </div>
                <div className="flex ml-auto justify-center items-center gap-2 flex-0">
                    {children}
                </div>
            </div>
        </div>
    )
}