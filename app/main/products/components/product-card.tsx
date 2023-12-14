import {ProductResponseDTO} from "@/backend/types";
import {CustomImage} from "@/app/components/image";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Typography} from "@/app/main/components/controls/typography";
import clsx from "clsx";
import Link from "next/link";


interface Props {
    data: ProductResponseDTO;
    className?: string;
}
export const ProductCard = ({data, className}:Props) => {
    const {getLanguage} = useLanguage();

    return <Link href={`/main/products/${data._id}`} className={clsx('cursor-pointer hover:shadow-lg hover:scale-[1.01] hover:z-10 transform shadow-sm bg-white transition ease-in',className)}>
        <div className='relative pt-[100%]'>
            <CustomImage className='object-cover absolute top-0 left-0 w-full h-full' src={data?.images[0]?.src} alt={getLanguage(data.title)}/>
        </div>

        <div className='px-2 sm:px-3 pb-5 sm:pb-3'>
            <Typography size='sm' className='text-primary-lighter mt-2'>
                {getLanguage(data.brand?.name ?? null)}
            </Typography>
            <Typography size='lg'>
                <span className='truncate block'>{getLanguage(data.title)}</span>
            </Typography>
        </div>
    </Link>
}