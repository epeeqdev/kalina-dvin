'use client'
import {Navigation} from "@/app/main/components/header/components/navigation";
import Image from "next/image";
import IconComponent from "@/components/icon";
import {useState} from "react";
import clsx from "clsx";

export const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <div className='w-full flex px-[10%] py-[10px] lg:py-[21px] items-center shadow-md'>
            <div>
                <Image src='/logo.png' alt='logo' width={100} height={44} className='w-auto h-[24px] lg:w-auto lg:h-[44px] '/>
            </div>
            <div className='flex-1'>
                <div className='flex lg:hidden justify-end'>
                    <IconComponent name='burgerManu' size={{width: 20, height: 18}} color='secondary' className='cursor-pointer' onClick={() => setIsNavOpen((prev) => !prev)}/>
                    <div className={clsx({
                        'absolute w-full h-screen top-0 left-0 bg-white z-10 flex flex-col items-center': isNavOpen,
                        'hidden': !isNavOpen
                    })}>
                        <IconComponent name='close' className='absolute top-0 right-0' onClick={() => setIsNavOpen(false)}/>
                        <div className='flex flex-col items-center justify-between min-h-[250px]'>
                            <Navigation/>
                        </div>
                    </div>
                </div>
                <div className='hidden lg:flex gap-x-[7%] justify-end items-center'>
                    <Navigation/>
                </div>
            </div>
        </div>
    )
}