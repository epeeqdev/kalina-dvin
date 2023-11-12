'use client'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import {SliderItem} from "@/app/main/components/swiper/components/swiper-slide";
import { Swiper, SwiperSlide } from 'swiper/react';
import clsx from "clsx";
import './components/swiper-slide/style.css'
import {HOME_PAGE_SLIDER_DATA} from "@/app/main/components/swiper/constants";

export const Slider = () => {
    return (
        <Swiper
            className={clsx(['h-[400px]', 'md:h-[calc(100vh-68px)]','bg-white !pb-4'])}
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
                HOME_PAGE_SLIDER_DATA.map((item) => (
                    <SwiperSlide className='w-full' key={item.id} >
                        <SliderItem title={item.title} description={item.description} img={item.img} link={item.link}/>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    );
};