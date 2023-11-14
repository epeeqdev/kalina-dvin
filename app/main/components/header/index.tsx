import {Navigation} from "@/app/main/components/header/components/navigation";
import Image from "next/image";
import IconComponent from "@/components/icon";
import {useState} from "react";
import clsx from "clsx";
import {MobileNavigation} from "@/app/main/components/header/components/mobile-navigation";
import Link from "next/link";
import {ContactsPageDTO} from "@/backend/types";

interface Props {
    contacts: ContactsPageDTO
}

export const Header = ({contacts}: Props) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const menuButton = isNavOpen ? 'close' : 'burgerManu'
    return (
        <div>
            <div className={clsx({
                'w-full flex px-[5%] py-[8px] lg:py-[12px] items-center shadow-md ' : !isNavOpen,
                'w-full flex px-[5%] py-[8px] lg:py-[12px] items-center shadow-md relative z-[999]': isNavOpen
            })}>
                <Link href='/main'>
                    <Image src='/logo.png' alt='logo' width={100} height={44} className='w-auto h-[36px] lg:w-auto lg:h-[46px] '/>
                </Link>
                <div className='flex-1'>
                    <div className='flex lg:hidden justify-end'>
                        <div  onClick={() => setIsNavOpen((prev) => !prev)} className='cursor-pointer px-2'>
                            <IconComponent color='primary' name={isNavOpen ? 'close': 'menu'}/>
                        </div>
                    </div>
                    <div className='hidden lg:flex gap-x-[7%] justify-end items-center'>
                        <Navigation contacts={contacts}/>
                    </div>
                </div>
            </div>
            <div className={clsx({
                'w-full h-screen bg-white z-10 flex lg:hidden flex-col items-center fixed top-[46px] left-0': isNavOpen,
                'hidden': !isNavOpen
            })}>
                <div className='flex flex-col w-full justify-between'>
                    <MobileNavigation contacts={contacts}/>
                </div>
            </div>
        </div>
    )
}