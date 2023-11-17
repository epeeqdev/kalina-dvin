import {Typography} from "@/app/main/components/controls/typography";
import Link from "next/link";


type Props = {
    title: string,
    link?: string
}
export const FooterBlockItem = ({title,link}: Props) => {
    return(
        <Link href={link ? link: '#'} className='cursor-pointer flex items-center gap-x-1mb-2'>
            <Typography color='white' size='md' className='hover:text-secondary transition'>{title}</Typography>
        </Link>
    )
}