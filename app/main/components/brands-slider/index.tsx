'use client'
import {BrandResponseDTO} from "@/backend/types";
import {BrandsSliderContent} from "@/app/main/components/brands-slider/brands-slider-content";

interface Props {
    brands: BrandResponseDTO[];
}

export const BrandsSlider = ({brands}: Props) => {
    return <BrandsSliderContent brands={brands}/>;
}