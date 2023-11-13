import clsx from "clsx";
import IconComponent from "@/components/icon";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {CategoryChip} from "@/app/main/components/category-chip";
import {useQueryString} from "@/utils/hooks/useQueryString";
import {usePathname, useRouter} from "next/navigation";
import {CategoryResponseDTO} from "@/backend/types";


export const SLIDER_BREAKPOINTS = {
    0: {
        spaceBetween: 4,
        slidesPerView: 2.1,
    },
    768: {
        spaceBetween: 6,
        slidesPerView: 4.1,
    },
    1024: {
        slidesPerView: 5.1,
    },
}

interface Props {
    categories?: CategoryResponseDTO[];
}

export const CategoriesSlider = ({categories}: Props) => {
    const {searchParams, pushQueryString} = useQueryString()
    const router = useRouter();
    const pathname = usePathname();
    const onCategoryClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        console.log('search', params.toString());
        params.set('category', id);
        router.push(`${pathname}/?${params.toString()}`);
    }
    const navigationButtonClassName = "hidden sm:block hover:text-white absolute cursor-pointer top-1/2 transform -translate-y-1/2 transition hover:bg-primary-lighter text-secondary"
    return <div className='py-4 relative'>
        <div className={clsx('prev-btn left-0 sm:left-[calc(5%-32px)]', navigationButtonClassName)}>
            <IconComponent
                size='lg'
                name='chevronLeft'/>
        </div>
        <div className='px-[5%]'>
            <Swiper breakpoints={SLIDER_BREAKPOINTS} slidesPerView={4} spaceBetween={4} modules={[Navigation]}
                    navigation={{
                        enabled: true,
                        nextEl: '.next-btn',
                        prevEl: '.prev-btn',
                    }}>

                {categories?.map((category) => (
                    <SwiperSlide key={category._id}>
                        <CategoryChip isActive={searchParams.get('category') === category._id} onClick={onCategoryClick}
                                      data={category}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={clsx('next-btn right-0 sm:right-[calc(5%-32px)]', navigationButtonClassName)}>
                <IconComponent
                    size='lg'
                    name='chevronRight'
                />
            </div>
        </div>
    </div>
}