import { useLanguage } from "@/app/main/hooks/useLanguage";
import Link from "next/link";

type Props = {
    title: { am : string, ru : string },
    className?: string
    slicedPathName?: string,
    handleClick?: () => void
    chosenNamePath?: string
    href?: string
}
export default function SideBarLink({title, className = "", slicedPathName = "", chosenNamePath = "", href = "", handleClick = () => {}}: Props){
    const { getLanguage } = useLanguage();
    return (
        <Link
            className={`${slicedPathName === chosenNamePath && "bg-white text-black font-bold"} ${className}`}
            href={href}
            onClick={handleClick}>{getLanguage(title)}</Link>
    )
}