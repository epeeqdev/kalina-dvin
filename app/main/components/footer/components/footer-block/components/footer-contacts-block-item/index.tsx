import {Typography} from "@/app/main/components/controls/typography";
import {IconNameOptions} from "@/components/icon/icons";
import IconComponent from "@/components/icon";

type Props = {
    icon?:IconNameOptions,
    title: string,
    link?: string,
    blankType?: boolean
}
export const FooterContactsBlock = ({icon, title,link, blankType}: Props) => {
    return(
        <a href={link ? link: '#'} className='cursor-pointer flex items-center gap-x-1 group hover:text-secondary mb-2' target={blankType ? '_blank': ''} rel={blankType ? 'noopener noreferrer': ''}>
            {icon && <IconComponent color='white' size='sm' name={icon} className='lg:w-[18px] lg:h-[18px] xl:w-[24px] xl:h-[24px] group-hover:text-secondary transition'/>}
            <Typography color='white' size='md' className='group-hover:text-secondary transition'>{title}</Typography>
        </a>
    )
}