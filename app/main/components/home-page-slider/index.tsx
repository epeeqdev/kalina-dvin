'use client'
import { SwiperSlide } from 'swiper/react';
import '@/app/main/components/home-page-slider/components/slide/style.css'
import {SlideDTO} from "@/backend/types";
import {Slide} from "@/app/main/components/home-page-slider/components/slide";
import {ReusableSlider} from "../controls/reusable-slider";

interface Props {
    slides?: SlideDTO[]
}
export const HomePageSlider = ({slides}:Props) => {
    return (
        <ReusableSlider className='md:h-[calc(100vh-68px)] md:max-h-[1080px] h-[300px] !pb-4'>
            {
                slides?.map((item) => (
                    <SwiperSlide className='w-full' key={item._id} >
                        <Slide data={item}/>
                    </SwiperSlide>
                ))
            }
        </ReusableSlider>
    );
};
