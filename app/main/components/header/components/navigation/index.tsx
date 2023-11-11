'use client'
import {ContactsOptions, LanguageOptions, NavigationItems} from "@/app/main/components/header/constants";
import Link from 'next/link'
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {useMainContext} from "@/app/main/hooks/useMainContext";
import {Typography} from "@/app/main/components/controls/typography";
import {Dropdown} from "@/app/main/components/controls/dropdown";


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
                        <Typography
                                title={getLanguage(item.title)}
                                color={isLinkActive(item.link!) ? 'text-primary' : 'text-inherit' }
                                fontSize='text-base'
                                className='transition-[color]'
                            />
                    </Link>
                )
                )
            }
            <div className='border-b-[1px] hover:border-primary transition border-transparent'>
                <Dropdown options={ContactsOptions.options} title={getLanguage(ContactsOptions.title)} dropdownClassname={ContactsOptions.dropdownClassname}/>
            </div>
            <div className='border-b-[1px] hover:border-primary transition border-transparent'>
                <Dropdown options={LanguageOptions.options} title={getLanguage(LanguageOptions.title)} dropdownClassname={LanguageOptions.dropdownClassname}  onChange={onChangeLanguage}/>
            </div>
        </>
    )
}