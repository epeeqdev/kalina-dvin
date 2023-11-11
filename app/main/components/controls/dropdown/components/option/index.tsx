import clsx from "clsx";
import IconComponent from "@/components/icon";
import {Typography} from "@/app/main/components/controls/typography";
import {IconNameOptions} from "@/components/icon/icons";

type Props = {
    dropdownClassname?: string;
    title: string;
    icon?: IconNameOptions;
    onClick?: () => void;
}

export const Option = ({icon, dropdownClassname, title, onClick}: Props) => {
    return(
        <div className="group hover:bg-primary hover:text-white transition" onClick={() => onClick ? onClick() : null}>
            <div className={clsx(['flex h-[46px] items-center',dropdownClassname])} >
                {icon && (
                    <div className="w-[24px] h-[24px]">
                        <IconComponent name={icon} className="group-hover:text-white text-primary" />
                    </div>
                )}
                <Typography title={title} color="text-inherit" fontSize="text-base"/>
            </div>
        </div>

    )
}