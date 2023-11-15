'use client'
import {BrandResponseDTO} from "@/backend/types";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Mousewheel, Scrollbar} from "swiper/modules";
import {Breakpoints} from "@/app/main/components/brands-slider/constants";
import {BrandCard} from "@/app/main/components/brands-slider/components/brand-card";

interface Props {
    brands: BrandResponseDTO[];
}

export const BrandsSlider = ({brands}: Props) => {
    const brandsDoubled = brands ? [...brands, ...brands, ...brands] : []
    return (
            <Swiper
                modules={[Scrollbar, Mousewheel, Autoplay]}
                loop={true}
                pagination={{ clickable: true }}
                mousewheel={{
                    invert: false,
                }}
                autoplay={{
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                }}
                breakpoints={Breakpoints}
                className="breakpoint h-[58px] lg:h-[80px] xl:h-[120px]"
            >
                {brandsDoubled.map((item, index) => {
                    return (
                        <SwiperSlide key={`${item._id}_${index}`}  className='py-1'>
                            <BrandCard data={item}/>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
    );
}