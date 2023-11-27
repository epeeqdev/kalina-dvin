import {HomePageSection} from "@/app/main/components/home-page-section";
import React from "react";
import {BLOCK_TITLE, Breakpoints} from "@/app/main/components/brands-slider/constants";
import {Autoplay, Mousewheel, Scrollbar} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {BrandCard} from "@/app/main/components/brands-slider/components/brand-card";
import {BrandResponseDTO} from "@/backend/types";

interface Props {
    brands:BrandResponseDTO[]
}

export const BrandsSliderContent =({brands}: Props) => {
    const brandsDoubled = brands ? [...brands, ...brands, ...brands] : []
    return <HomePageSection
        header={BLOCK_TITLE}
        childrenClassName='pl-[5%]'
        className='pt-[25px] lg:pt-[45px]'
    >
        {/*<BrandsSlider brands={brands}/>*/}
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
            className="breakpoint h-[80px] xl:h-[120px]"
        >
            {brandsDoubled.map((item, index) => {
                return (
                    <SwiperSlide key={`${item._id}_${index}`}  className='py-1'>
                        <BrandCard data={item}/>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    </HomePageSection>
}