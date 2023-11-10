'use client'
import {BrandResponseDTO} from "@/backend/types";
import {BreakPointCarousel} from "@/app/main/components/carousel/components/break-point-carousel";

interface Props {
    brands: BrandResponseDTO;
}

export const Carousel = ({brands}:Props) => {
    return <BreakPointCarousel brands={brands}/>

}