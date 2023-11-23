'use client'
import { Pagination, Autoplay, A11y } from 'swiper/modules';
import { Swiper} from 'swiper/react';
import clsx from "clsx";
import '@/app/main/components/home-page-slider/components/slide/style.css'
import {ImageDTO, SlideDTO} from "@/backend/types";
import {ReactNode} from "react";

interface Props {
    slides?: SlideDTO[] | ImageDTO[];
    className?: string;
    children?: ReactNode
}
export const ReusableSlider = ({ children, className }:Props) => {
    return (
            <Swiper
                className={clsx([className])}
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
                {children}
            </Swiper>
    );
};