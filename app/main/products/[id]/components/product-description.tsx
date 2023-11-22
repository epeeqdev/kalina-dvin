import {Typography} from "@/app/main/components/controls/typography";
import {ProductResponseDTO} from "@/backend/types";
import {useLanguage} from "@/app/main/hooks/useLanguage";

interface Props {
    product: ProductResponseDTO
}
export const ProductDescription = ({product}:Props) => {
    const {getLanguage} = useLanguage()
    return (
        <div className='flex gap-y-[34px] flex-col'>
            <Typography size='lg' fontWeight={700}>{getLanguage(product?.title)}</Typography>
            <Typography >{getLanguage(product?.brand.name)}</Typography>
            {product.attributes.map((el) => (
                <div key={el._id} className='flex gap-x-1'>
                    <Typography size='md' fontWeight={600}>{`${getLanguage(el.attribute.name)}:`}</Typography>
                    <Typography size='md'>{getLanguage(el.value)}</Typography>
                </div>
            ))}
            <Typography size='md' className='w-full max-w-[800px]'>{getLanguage(product.description)}</Typography>
        </div>
    )
}