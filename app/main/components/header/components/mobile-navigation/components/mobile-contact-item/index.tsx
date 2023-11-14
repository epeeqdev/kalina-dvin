import {Typography} from "@/app/main/components/controls/typography";
import {IconNameOptions} from "@/components/icon/icons";
import IconComponent from "@/components/icon";

interface Props  {
    title:string;
    icon:IconNameOptions
}

export const MobileContactItem = ({icon, title}: Props) => {
    return(
            <div className='flex items-center pl-6 py-2 gap-x-1.5 bg-white group hover:bg-secondary hover:text-white'>
                <IconComponent name={icon} size='sm'/>
                <Typography  size='sm' className='group-hover:text-white'>{title}</Typography>
            </div>
    )
}