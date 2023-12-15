'use client'
import clsx from "clsx";

import {Button} from "@/app/main/components/controls/button";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {ASSORTMENT, BRAND, BUTTON_TITLE, PARTNER} from "@/app/main/components/about-block/costants";
import {AboutOptions} from "@/app/main/components/about-block/components/about-grid/about-options";
import {Typography} from "@/app/main/components/controls/typography";
import {useRouter} from "next/navigation";
import {AboutUsDTO} from "@/backend/types";
import {CustomImage} from "../../../../../components/image";

interface Props {
    aboutOptions: AboutUsDTO
}
export const AboutGrid = ({aboutOptions}:Props) => {
    const {getLanguage} = useLanguage();
    const router = useRouter()

    const handleSeeMore = () => {
        router.push('/main/about-us')
    }
    return (
        <div className="grid grid-cols-12 gap-x-[5%] gap-y-[40px]">
            <div className="col-span-12 sm:col-span-4">
                <div className={clsx('relative pt-[100%] select-none')}>
                    <CustomImage
                        src={aboutOptions.mainPageImage?.src}
                        alt={aboutOptions.mainPageImage?.id}
                        className={clsx('absolute top-0 left-0 w-full h-full transition object-cover')}
                    />
                </div>
            </div>
            <div className='col-span-12 sm:col-span-8'>
                <div className='flex flex-col justify-between h-auto lg:h-full gap-y-4 lg:gap-y-0'>
                    <div>
                        <Typography size='lg' className='text-align-last-center lg:text-start'>
                            {getLanguage(aboutOptions.homePageDescription)}
                        </Typography>
                    </div>
                    <div className='flex gap-x-[10%]'>
                        <AboutOptions option={aboutOptions.brandsCount} title={getLanguage(BRAND)}/>
                        <AboutOptions option={aboutOptions.assortmentCount} title={getLanguage(ASSORTMENT)}/>
                        <AboutOptions option={aboutOptions.partnersCount} title={getLanguage(PARTNER)}/>
                    </div>
                    <div className="flex justify-items-start lg:justify-end">
                        <Button onClick={handleSeeMore}>{getLanguage(BUTTON_TITLE)}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}