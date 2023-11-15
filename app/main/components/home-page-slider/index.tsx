'use client'
import { Pagination, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from "clsx";
import '@/app/main/components/home-page-slider/components/slide/style.css'
import {SlideDTO} from "@/backend/types";
import {Slide} from "@/app/main/components/home-page-slider/components/slide";

interface Props {
    slides?: SlideDTO[]
}
export const HomePageSlider = ({slides}:Props) => {
    return (
        <div className='flex'>
        <Swiper
            className={clsx(['sm:h-[400px]', 'md:h-[calc(100vh-68px)]','bg-white !pb-4'])}
            modules={[Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{delay: 3000, disableOnInteraction: true}}
            pagination={{
                horizontalClass: 'hor-pagination',
                clickable: true,
                bulletClass: 'hor-pagination-bullet',
                bulletActiveClass: 'hor-pagination-bullet-active',
                bulletElement: 'div'
            }}
        >
            {
                slides?.map((item) => (
                    <SwiperSlide className='w-full' key={item._id} >
                        <Slide data={item}/>
                    </SwiperSlide>
                ))
            }

        </Swiper>
        </div>
    );
};