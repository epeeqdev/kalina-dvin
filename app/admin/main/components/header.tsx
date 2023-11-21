import {ReactNode} from "react";

interface Props {
    children?: ReactNode,
    title?: string
}
export default function Header({children, title}: Props){
    return (
        <div className="flex flex-0 items-center justify-between z-[30] bg-white pt-5 shadow-sm relative">
            <div className="sm:flex items-center justify-between w-[100%] px-5">
                <div>
                    <h1 className="text-3xl flex justify-center mb-5">{title}</h1>
                </div>
                <div className="flex justify-center items-center mb-5 gap-2">
                    {children}
                </div>
            </div>
        </div>
    )
}