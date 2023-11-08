'use client'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import {SliderItem} from "@/app/main/components/swiper/components/swiper-slide";
import { Swiper, SwiperSlide } from 'swiper/react';
import {SlideDate} from "@/app/main/components/swiper/constants";
import clsx from "clsx";
import './components/swiper-slide/style.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'

export const Slider = () => {
    return (
        <Swiper
            className={clsx(['h-[232px]', 'sm:h-[350px]', 'md:h-[350px]', 'lg:h-[500px]', 'xl:h-[652px]', '2xl:h-[752px]', 'swiper', 'bg-black', 'px-[3.1%]'])}
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={{delay: 2500}}
            pagination={{
                clickable: true,
                bulletClass: 'bg-primary w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3.5 xl:h-3.5 inline-block rounded-full m-1',
                bulletActiveClass: 'border border-white opacity-100'
            }}
        >
            {
                SlideDate.map((item) => (
                    <SwiperSlide className='w-full' key={item.id} >
                        <SliderItem title={item.title} description={item.description} img={item.img} link={item.link}/>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    );
};