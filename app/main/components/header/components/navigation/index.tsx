'use client'
import {NavigationItems} from "@/app/main/components/header/constants";
import Link from 'next/link'
import {Typography} from "@/components/controls/typography";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {Dropdown} from "@/components/controls/dropdown";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {useMainContext} from "@/app/main/hooks/useMainContext";


export const Navigation = () => {
    const { getLanguage } = useLanguage();
    const pathName = usePathname();
    const [language, [setMainContextState]] = useMainContext()

    const onChangeLanguage = (language: string) => {
        setMainContextState(language)
        localStorage.setItem('lng', language)
    }
    const isLinkActive = (link: string) => pathName === link
    return(
        <>
            {
                Object.values(NavigationItems).map((item) => (
                    <Link href={item.link ? item.link : '#'} key={item.id} className={clsx('border-b-[1px] hover:border-primary transition', {
                        'border-primary': item.link && isLinkActive(item.link),
                        'border-transparent': !item.link || !isLinkActive(item.link)
                    })}>
                        {item.isSelect
                            ? <Dropdown options={item.options} title={getLanguage(item.title)} dropdownClassname={item.dropdownClassname} onChange={onChangeLanguage}/>
                            : <Typography
                                title={getLanguage(item.title)}
                                color={isLinkActive(item.link!) ? 'text-primary' : 'text-inherit' }
                                fontSize='text-base'
                                className='transition-[color]'
                            />
                        }
                    </Link>
                )
                )
            }
        </>
    )
}