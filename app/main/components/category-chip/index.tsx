import {CategoryResponseDTO} from "@/backend/types";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import clsx from "clsx";
import {memo} from "react";

interface Props {
    data: CategoryResponseDTO;
    isActive?: boolean;
    onClick?: (id: string) => void;
}

export const CategoryChip = memo(({data, isActive, onClick = () => null}: Props) => {
    const {getLanguage} = useLanguage();
    return (
        <div onClick={() => onClick(data._id)}
             className={clsx("flex items-center justify-center p-1 text-white text-[16px] capitalize transition cursor-pointer hover:shadow-lg my-2", {
                 'bg-primary': !isActive,
                 'bg-secondary': isActive
             })}>
            {getLanguage(data.name)}
        </div>
    )
})