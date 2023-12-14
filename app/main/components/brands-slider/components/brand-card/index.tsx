import clsx from "clsx";
import Link from "next/link";
import {BrandResponseDTO} from "@/backend/types";
import {CustomImage} from "@/app/components/image";

interface Props {
    data: BrandResponseDTO;
    className?: string
}
export const BrandCard = ({data, className}: Props) => {
    return (
        <Link href={`/main/products?brand=${data._id}`} className='hover:bg-gray-lighter border border-gray w-full h-full px-1 py-1 md:py-2 transition block select-none'>
            <CustomImage placeholderWithoutBorder src={data.image?.src} alt={data.name.ru} className={clsx('h-full w-full object-contain', className)}/>
        </Link>
    )
}