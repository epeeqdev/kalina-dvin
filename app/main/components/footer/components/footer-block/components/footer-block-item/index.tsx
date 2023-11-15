import {Typography} from "@/app/main/components/controls/typography";
import Link from "next/link";


type Props = {
    title: string,
    link?: string
}
export const FooterBlockItem = ({title,link}: Props) => {
    return(
        <Link href={link ? link: '#'} className='cursor-pointer flex items-center gap-x-1 group hover:text-secondary transition-[color] mb-2'>
            <Typography color='white' size='md' className='group-hover:text-inherit transition'>{title}</Typography>
        </Link>
    )
}