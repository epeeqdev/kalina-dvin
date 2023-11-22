import {ProductResponseDTO} from "@/backend/types";
import {CustomImage} from "@/app/main/components/image";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Typography} from "@/app/main/components/controls/typography";
import clsx from "clsx";
import {useRouter} from "next/navigation";

interface Props {
    data: ProductResponseDTO;
    className?: string;
}
export const ProductCard = ({data, className}:Props) => {
    const {getLanguage} = useLanguage();
    const router = useRouter()
    const getSelectProductData = (id:string) => {
        router.push(`/main/products/${id}`)
    }
    return <div className={clsx('cursor-pointer hover:bg-gray-lighter transition',className)} onClick={() => getSelectProductData(data._id) }>
        <div className='relative pt-[100%] mt-1'>
            <CustomImage className='object-cover absolute top-0 left-0 w-full h-full' src={data?.images[0]?.src} alt={getLanguage(data.title)}/>
        </div>

        <div className='px-2 sm:px-3 pb-2 sm:pb-3'>
            <Typography size='sm' className='text-primary-lighter mt-2'>
                {getLanguage(data.brand?.name ?? null)}
            </Typography>
            <Typography size='lg'>
                <span className='break-words' style={{textWrap:'pretty'} as any}>{getLanguage(data.title)}</span>
            </Typography>
        </div>
    </div>
}