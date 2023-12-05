import Link from "next/link";

type Props = {
    title: string,
    className?: string
    slicedPathName?: string,
    handleClick?: () => void
    chosenNamePath?: string
    href?: string
}
export default function SideBarLink({title, className, slicedPathName, chosenNamePath, href, handleClick}: Props){
    return (
        <Link
            className={`${className} ${slicedPathName === chosenNamePath && "bg-white text-black font-bold"}`}
            href={href}
            onClick={handleClick}>{title}</Link>
    )
}