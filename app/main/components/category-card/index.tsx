import {Typography} from "@/app/main/components/controls/typography";
import {CategoryResponseDTO} from "@/backend/types";
import clsx from "clsx";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {CustomImage} from "@/app/main/components/image";
import Link from "next/link";

interface Props {
    data: CategoryResponseDTO;
    className?: string;
}
export const  CategoryCard = ({data, className }: Props) => {
    const {getLanguage} = useLanguage();
    return(
        <Link href={`/main/products?category=${data._id}`} className='cursor-pointer group hover:bg-gray-lighter transition'>
            <div className={clsx('relative pt-[60%] mb-1.5 md:mb-2 lg:mb-3 select-none ', className)}>
                <CustomImage src={data?.image?.src} className='absolute top-0 left-0 w-full h-full group-hover:opacity-75 transition object-cover'/>
            </div>
            <Typography className='pl-3' fontWeight={500} size='lg'>{getLanguage(data.name)}</Typography>
        </Link>
    )
}