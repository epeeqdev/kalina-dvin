import {CategoryResponseDTO} from "@/backend/types";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import clsx from "clsx";
import {memo} from "react";
import {Typography} from "@/app/main/components/controls/typography";

interface Props {
    data: CategoryResponseDTO;
    isActive?: boolean;
    onClick?: (id: string) => void;
}

export const CategoryChip = memo(({data, isActive, onClick = () => null}: Props) => {
    const {getLanguage} = useLanguage();
    return (
        <Typography color='white' size='md' onClick={() => onClick(data._id)}
             className={clsx("flex items-center justify-center p-1 capitalize transition cursor-pointer", {
                 'bg-primary hover:bg-primary-darker': !isActive,
                 'bg-secondary hover:bg-secondary-darker': isActive
             })}>
            {getLanguage(data.name)}
        </Typography>
    )
})