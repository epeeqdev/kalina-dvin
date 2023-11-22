import {ProductResponseDTO} from "@/backend/types";
import clsx from "clsx";
import {CustomImage} from "@/app/main/components/image";
import {ProductDescription} from "@/app/main/products/[id]/components/product-description";


interface Props {
    data: ProductResponseDTO;

}
export const ProductInfo = ({data}:Props) => {
    const imageCount = Boolean(data.images.length>1)
    return(
        <div className='grid grid-cols-12 mx-[5%] gap-x-[4%] mt-[4%]'>
            <div className='col-span-6 xl:col-span-6'>
                <div className={clsx({
                    'grid grid-cols-1 md:grid-cols-2': imageCount,
                    'grid grid-cols-1': !imageCount
                }, 'gap-[12px]')}>{
                    data.images.map((item) =>(
                        <div key={item._id} className='col-span-1 relative pt-[90%] mt-1'>
                            <CustomImage src={item.src} className='object-cover absolute top-0 left-0 w-full h-full'/>
                        </div>
                    ))
                }
                </div>
            </div>
            <div className='col-span-6 xl:col-span-6'>
                <ProductDescription product={data}/>
            </div>
        </div>
    )
}