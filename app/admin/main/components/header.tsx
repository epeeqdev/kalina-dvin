import {ReactNode} from "react";

interface Props {
    children?: ReactNode,
    title?: string
    withSearch?: boolean
}
export default function Header({children, title, withSearch = false}: Props){
    return (
        <div className="flex items-center z-[30] bg-white py-5 shadow-sm relative">
            <div className="flex gap-4 flex-wrap-reverse justify-between w-full px-5">
                <div className='flex whitespace-nowrap items-center'>
                    <h1 className="text-xl">{title}</h1>
                </div>
                <div className={`flex items-center gap-2 ${withSearch ? "flex-1" : "flex-0"}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}