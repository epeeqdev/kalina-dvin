import {Typography} from "@/app/main/components/controls/typography";
import {CategoryResponseDTO} from "@/backend/types";
import clsx from "clsx";
import {useLanguage} from "@/app/main/hooks/useLanguage";
interface Props {
    data: CategoryResponseDTO;
    className?: string;
    onClick: (id:string) => void
}
export const  CategoryCard = ({data, className, onClick }: Props) => {
    const {getLanguage} = useLanguage()
    return(
        <div onClick={() => onClick(data._id)} className='cursor-pointer group'>
            <div className={clsx('relative pt-[60%] mb-1.5 md:mb-2 lg:mb-3 select-none ', className)}>
                <img src={data?.image?.src} alt={data.name.ru} className={clsx('absolute top-0 left-0 w-full h-full group-hover:opacity-75 transition object-cover')}/>
            </div>
            <Typography fontWeight={500} size='lg'>{getLanguage(data.name)}</Typography>
        </div>
    )
}