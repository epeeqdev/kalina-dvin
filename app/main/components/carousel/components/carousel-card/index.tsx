import clsx from "clsx";
import Link from "next/link";
import {BrandResponseDTO} from "@/backend/types";

interface Props {
    data: BrandResponseDTO;
    className?: string
}
export const BrandCard = ({data, className}: Props) => {
    return (
        <Link href={`/main/products?brand=${data._id}`} className='hover:shadow-md border border-[#e8e8e8] w-full h-full px-1 py-1 md:py-2 transition block select-none'>
            <img src={data.image?.src} alt={data.name.ru} className={clsx('h-full w-full object-contain', className)}/>
        </Link>
    )
}