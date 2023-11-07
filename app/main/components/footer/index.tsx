'use client'
import {Typography} from "@/components/controls/typography";
import Image from "next/image";
import IconComponent from "@/components/icon";
import {Index} from "@/app/main/components/footer/components/footer-blogs";
import {FooterItemsBlog} from "@/app/main/components/footer/constanst";
import clsx from "clsx";
import { useLanguage } from "@/app/main/hooks/useLanguage";



export const Footer = () => {
    const { getLanguage } = useLanguage();
    return(
        <div className='bg-secondary w-full h-[267px] lg:h-[398px] flex flex-col'>
            <div className='flex-1 pt-[24px] lg:pt-[48px] pb-[20px] lg:pb-[48px] pl-[11%] pr-[14.5%]'>
                <div className='flex flex-col lg:flex-row h-full'>
                    <div className='flex justify-around lg:justify-between flex-col border-r-[0] border-b-[1px] lg:border-r-[1px] lg:border-b-[0] border-primary w-full max-w-full lg:max-w-[24%] h-full'>
                        <div>
                            <Image src='/footerLogo.png' alt='footerLogo' width={152} height={60} className='w-[68px] h-[26px] lg:w-[152px] lg:h-[60px]'/>
                        </div>
                        <Typography title='Լորեմ Իպսումը տպագրության և տպագրական արդյունաբերության տեքստ է։' color='text-white' fontSize={"text-medium"} className='lg:text-base'/>
                        <div className='flex gap-x-[3.5%]'>
                            <IconComponent name='facebook' color='white'  className='lg:w-[32px] lg:h-[32px]'/>
                            <IconComponent name='instagram' color='white'  className='lg:w-[32px] lg:h-[32px]'/>
                        </div>
                    </div>
                    <div className='flex-1 flex justify-start lg:justify-between pl-[0] lg:pl-[12%] pt-[20px] lg:pt-[0]'>
                        {
                            Object.values(FooterItemsBlog).map((el) =>(
                                <div key={el.id} className={clsx([el.classNames, 'flex-1 gap-y-[12px] lg:gap-y-[16px] flex-col'])}>
                                    <Typography title={getLanguage(el.title)} fontSize='text-xs' color='text-white' className={clsx(['lg:text-lg'])} lineHeight='leading-[14.4px]'/>
                                    <Index items={el.items}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center items-center py-[5px] lg:py-[20px] border-t-[0.5px] border-primary'>
                <Typography title='© 2023 - Copyright | All rights Reserved' color='text-white' fontSize='text-small' lineHeight='20px' className='lg:text-base'/>
            </div>
        </div>
    )
}