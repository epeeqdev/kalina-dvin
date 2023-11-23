import {Navigation} from "@/app/main/components/header/components/navigation";
import IconComponent from "@/components/icon";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {MobileNavigation} from "@/app/main/components/header/components/mobile-navigation";
import Link from "next/link";
import {ContactsPageDTO} from "@/backend/types";
import {useMatchMedia} from "@/utils/hooks/useMatchMedia";
import {LogoIcon} from "../logoIcon";
import {useRouter} from "next/navigation";
import './style.css'
import {useMainContext} from "@/app/main/hooks/useMainContext";

interface Props {
    contacts: ContactsPageDTO
}

export const Header = ({contacts}: Props) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const isLG = useMatchMedia('(min-width:1024px)');
    const router = useRouter();
    const [language, [setMainContextState]] = useMainContext()
    const onChangeLanguage = (language: string) => {
        setMainContextState(language)
        localStorage.setItem('lng', language)
    }
    const handleNavigate = (link:string) => {
        router.push(link)
        setIsNavOpen(false)
    }
    useEffect(() => {
        if(isNavOpen) {
            document.documentElement.style.overflow = 'hidden'
        }
        return () => {
            document.documentElement.style.overflow = 'unset'
        }
    },[isNavOpen])

    useEffect(() => {
        if(isLG){
            setIsNavOpen(false)
        }
    },[isLG])
    return (
        <div className='sticky z-40 top-0 md:block'>
            <div style={{boxShadow: '0px -2px 4px #2c2a26'}} className={clsx('w-full flex px-[5%] py-[8px] lg:py-[12px] items-center bg-white',
                {
                'relative' : !isNavOpen,
                'fixed z-[999]': isNavOpen
            })}>
                <Link href='/main'>
                    <LogoIcon color='primary' width='100' height='44' className='w-auto h-[36px] lg:w-auto lg:h-[46px]'/>
                </Link>
                <div className='flex-1'>
                    <div className={clsx('flex justify-end lg:hidden', {
                        'pr-0' : !isNavOpen,
                        'pr-[13px] close-button': isNavOpen
                    })}>
                        <div  onClick={() => setIsNavOpen((prev) => !prev)} className='cursor-pointer px-2'>
                            <IconComponent color='primary' name={isNavOpen ? 'close': 'menu'}/>
                        </div>
                    </div>
                    <div className='hidden lg:flex gap-x-[4%] justify-end items-center'>
                        <Navigation contacts={contacts} language={language} onChangeLng={onChangeLanguage}/>
                    </div>
                </div>
            </div>
            <div className={clsx({
                'w-full h-screen bg-white mt-[48px] lg:mt-[58px] z-10 flex  flex-col items-center fixed top-[0] left-0': isNavOpen,
                'hidden': !isNavOpen
            })}>
                <div className='flex flex-col w-full justify-between'>
                    <MobileNavigation contacts={contacts} onClick={handleNavigate} onChangeLng={onChangeLanguage} language={language}/>
                </div>
            </div>
        </div>
    )
}