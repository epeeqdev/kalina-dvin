import {Typography} from "@/app/main/components/controls/typography";
import Link from "next/link";
import {IconNameOptions} from "@/components/icon/icons";
import IconComponent from "@/components/icon";

type Props = {
    icon?:IconNameOptions,
    title: string,
    link?: string
}
export const FooterContactsBlock = ({icon, title,link}: Props) => {
    return(
        <a href={link ? link: '#'} className='cursor-pointer flex items-center gap-x-1 group hover:text-white-darker transition'>
            {icon && <IconComponent color='white' size='sm' name={icon} className='lg:w-[18px] lg:h-[18px] xl:w-[24px] xl:h-[24px] group-hover:text-inherit transition'/>}
            <Typography color='white' size='sm' className='group-hover:text-inherit transition'>{title}</Typography>
        </a>
    )
}