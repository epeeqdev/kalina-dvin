import { Scrollbar, Mousewheel, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {BrandResponseDTO} from "@/backend/types";
import {Breakpoints} from "@/app/main/components/carousel/constants";
import {BrandCard} from "@/app/main/components/carousel/components/carousel-card";

type Props = {
    brands: BrandResponseDTO[],
}
export const BreakPointCarousel = ({brands}: Props) => {
    const brandsDoubled = brands ? [...brands, ...brands, ...brands] : []
    return (
        <div>
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
        </div>
    );
}