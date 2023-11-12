import {ProductResponseDTO} from "@/backend/types";
import {CustomImage} from "@/app/main/components/image";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Typography} from "@/app/main/components/controls/typography";

interface Props {
    data: ProductResponseDTO;
    className?: string;
}
export const ProductCard = ({data, className}:Props) => {
    const {getLanguage} = useLanguage();
    return <div className={className}>
        <div className='relative pt-[100%] mt-1'>
            <CustomImage className='object-cover absolute top-0 left-0 w-full h-full' src={data?.images[0]?.src} alt={getLanguage(data.title)}/>
        </div>

        <div>
            <Typography size='sm' className='text-primary-lighter mt-2'>
                {getLanguage(data.brand?.name ?? '')}
            </Typography>
            <Typography size='lg'>
                {getLanguage(data.title)}
            </Typography>
        </div>
    </div>
}