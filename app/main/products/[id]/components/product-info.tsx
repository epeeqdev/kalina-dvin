import {ProductResponseDTO} from "@/backend/types";
import clsx from "clsx";
import {CustomImage} from "@/app/main/components/image";
import {ProductDescription} from "@/app/main/products/[id]/components/product-description";
import {ReusableSlider} from "@/app/main/components/controls/reusable-slider ";

export const ProductInfo = ({data}: Props) => {
    const imageCount = Boolean(data.images.length > 1)
    return (
        <div>
            <div className='block md:hidden'>
                <ReusableSlider slides={data.images} className='!pb-4'>
                    {data.images?.map((item) => (
                        <SwiperSlide className='w-full' key={item._id}>
                            <div className='w-full pt-[100%] relative'>
                                <img src={item.src} alt='Main page slide image'
                                     className='w-full h-full object-cover absolute left-0 top-0'/>
                            </div>
                        </SwiperSlide>
                    ))}
                </ReusableSlider>
            </div>
            <div className='grid grid-cols-12 mx-[5%] gap-x-[4%]'>
                <div className='col-span-12 md:col-span-6'>
                    <div className={clsx({
                        'grid grid-cols-2': imageCount,
                        'grid grid-cols-1': !imageCount
                    }, 'gap-[12px] hidden md:grid')}>{
                        data.images.map((item) => (
                            <div key={item._id} className='col-span-1 relative pt-[100%] mt-1'>
                                <CustomImage src={item.src}
                                             className='object-cover absolute top-0 left-0 w-full h-full'/>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <div className='col-span-12 md:col-span-6 mt-4 md:mt-0'>
                    <ProductDescription product={data}/>
                </div>
            </div>
        </div>
    )
}


import {SwiperSlide} from 'swiper/react';

interface Props {
    data: ProductResponseDTO;

}
