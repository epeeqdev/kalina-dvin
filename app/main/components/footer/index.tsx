'use client'
import {Typography} from "@/app/main/components/controls/typography";
import Image from "next/image";
import IconComponent from "@/components/icon";
import { FooterBlogs} from "@/app/main/components/footer/components/footer-blogs";
import {FooterItemsBlog} from "@/app/main/components/footer/constanst";
import clsx from "clsx";
import { useLanguage } from "@/app/main/hooks/useLanguage";


export const Footer = () => {
    const { getLanguage } = useLanguage();
    const socialIconClasses = 'w-[24px] h-[24px] lg:w-[40px] lg:h-[40px]'
    return(
        <div className='bg-primary w-full h-[267px] lg:h-[398px] flex flex-col'>
            <div className='flex-1 pt-[24px] lg:pt-[48px] pb-[20px] lg:pb-[48px] pl-[11%] pr-[14.5%]'>
                <div className='flex flex-col lg:flex-row h-full'>
                    <div className='flex justify-around pr-[48px] lg:justify-between flex-col border-r-[0] border-b-[1px] lg:border-r-[1px] lg:border-b-[0] border-primary w-full max-w-full lg:max-w-[230px] xl:max-w-[383px] h-full'>
                        <div>
                            <Image src='/footerLogo.png' alt='footerLogo' width={152} height={60} className='w-[68px] h-[26px] lg:w-[152px] lg:h-[60px]'/>
                        </div>
                        <Typography color='white' size="xl">
                            Լորեմ Իպսումը տպագրության և տպագրական արդյունաբերության տեքստ է։
                        </Typography>
                        <div className='flex gap-x-[12px]'>
                            <IconComponent name='facebook' color='' size={{width:40, height:40}} className={socialIconClasses} />
                            <IconComponent name='instagram' color='white'  size={{width:40, height:40}} className={socialIconClasses}/>
                        </div>
                    </div>
                    <div className='flex-1 flex justify-start lg:justify-between pl-[0] lg:pl-[3%] xl:pl-[8%] pt-[20px] lg:pt-[0]'>
                        {
                            Object.values(FooterItemsBlog).map((el) =>(
                                <div key={el.id} className={clsx(el.classNames, 'flex-1 gap-y-[12px] lg:gap-y-[16px] flex-col')}>
                                    <Typography title={getLanguage(el.title)} fontSize='text-xs' color='text-white' className={clsx(['lg:text-lg'])} lineHeight='leading-[14.4px]'/>
                                    <FooterBlogs items={el.items}/>
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