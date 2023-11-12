import clsx from "clsx";
import IconComponent from "@/components/icon";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {CategoryChip} from "@/app/main/components/category-chip";
import {useQueryString} from "@/utils/hooks/useQueryString";
import {usePathname, useRouter} from "next/navigation";
import {CategoryResponseDTO} from "@/backend/types";

interface Props {
    categories?: CategoryResponseDTO[];
}

export const CategoriesSlider = ({categories}: Props) => {
    const {searchParams, pushQueryString} = useQueryString()
    const router = useRouter();
    const pathname = usePathname();
    const onCategoryClick = (id: string) => {
        router.push(`${pathname}?${new URLSearchParams({category: id}).toString()}`)
    }
    const navigationButtonClassName = "absolute cursor-pointer p-1 top-1/2 transform -translate-y-1/2"
    return <div className='py-4 relative'>
        <div className={clsx('prev-btn left-[1%]', navigationButtonClassName)}><IconComponent size='lg'
                                                                                              name='chevronLeft'/></div>
        <div className='px-[5%]'>
            <Swiper slidesPerView={4} spaceBetween={4} modules={[Navigation]} navigation={{
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
            <div className={clsx('next-btn right-[1%]', navigationButtonClassName)}><IconComponent size='lg'
                                                                                                   name='chevronRight'/>
            </div>
        </div>
    </div>
}