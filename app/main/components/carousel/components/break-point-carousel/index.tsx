import { Scrollbar, Mousewheel, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {BrandResponseDTO} from "@/backend/types";
import {Breakpoints} from "@/app/main/components/carousel/constants";
import {CarouselCard} from "@/app/main/components/carousel/components/carousel-card";

type Props = {
    brands: BrandResponseDTO,
}
export const BreakPointCarousel = ({brands}: Props) => {
    return (
        <div>
            <Swiper
                modules={[Scrollbar, Mousewheel, Autoplay]}
                loop={true}
                pagination={{ clickable: true }}
                centeredSlides={true}
                grabCursor={true}
                mousewheel={{
                    invert: false,
                }}
                autoplay={{
                    delay: 1000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                }}
                breakpoints={Breakpoints}
                className="breakpoint h-[47px] md:h-[80px] lg:h-[137px]"
            >
                {brands?.map((item) => {
                    return (
                            <SwiperSlide key={item._id}  className='hover:shadow-md border border-secondary w-full min-w-[125px] max-w-[282px] h-full'>
                                <CarouselCard src={item.image?.src}/>
                            </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}