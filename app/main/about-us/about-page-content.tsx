'use client'
import {AboutOptions} from "@/app/main/components/about-block/components/about-grid/about-options";
import {ASSORTMENT, BRAND, PARTNER} from "@/app/main/components/about-block/costants";
import {DescriptionBottom} from "@/app/main/about-us/components/description-bottom";
import {AboutUsDTO} from "@/backend/types";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {DescriptionTop} from "@/app/main/about-us/components/description-top";

interface Props {
    aboutUsData: AboutUsDTO
}

export const AboutPageContent = ({aboutUsData}:Props) => {
    const {getLanguage} = useLanguage()
    return (
        <div>
            <DescriptionTop aboutUsPageDescriptionTop={getLanguage(aboutUsData.aboutUsPageDescriptionTop)}/>
            <div className='flex w-full bg-primary items-center justify-center gap-[6%] py-[20px]'>
                <AboutOptions title={getLanguage(BRAND)} option={aboutUsData.brandsCount} optionClassName='text-secondary' titleClassName='text-white'/>
                <AboutOptions title={getLanguage(ASSORTMENT)} option={aboutUsData.assortmentCount} optionClassName='text-secondary' titleClassName='text-white'/>
                <AboutOptions title={getLanguage(PARTNER)} option={aboutUsData.partnersCount} optionClassName='text-secondary' titleClassName='text-white'/>
            </div>
            <DescriptionBottom aboutUsPageDescriptionBottom={getLanguage(aboutUsData.aboutUsPageDescriptionBottom)}/>
        </div>
    )
}