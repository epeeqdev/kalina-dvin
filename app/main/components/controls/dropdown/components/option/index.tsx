import clsx from "clsx";
import IconComponent from "@/components/icon";
import {Typography} from "@/app/main/components/controls/typography";
import {IconNameOptions} from "@/components/icon/icons";

type Props = {
    className?: string;
    title: string;
    icon?: IconNameOptions;
    onClick?: () => void;
    id?:string;
}

export const Option = ({icon, className, title, onClick}: Props) => {
    return(
        <div className="group hover:bg-secondary hover:text-white transition" onClick={onClick}>
            <div className={clsx(['flex h-[46px] items-center',className])} >
                {icon && (
                    <div className="w-[24px] h-[24px]">
                        <IconComponent name={icon} className="group-hover:text-white text-primary transition" />
                    </div>
                )}
                <Typography className='group-hover:text-white transition truncate'>{title}</Typography>
            </div>
        </div>

    )
}