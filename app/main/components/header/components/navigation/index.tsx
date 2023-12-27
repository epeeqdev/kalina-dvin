import {
    CONTACTS_TITLE,
    LanguageOptions,
    NavigationItems
} from "@/app/main/components/header/constants";
import Link from 'next/link'
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {Typography} from "@/app/main/components/controls/typography";
import {Dropdown} from "@/app/main/components/controls/dropdown";
import {Option} from "@/app/main/components/controls/dropdown/components/option";
import {ContactsPageDTO} from "@/backend/types";
import {generateGoogleMapsLink} from "@/utils/googleMaps";

interface Props {
    contacts: ContactsPageDTO,
    language: 'am' | 'ru',
    onChangeLng: (language:string) => void

}
export const Navigation = ({contacts, language, onChangeLng}: Props) => {
    const { getLanguage } = useLanguage();
    const pathName = usePathname();
    const isLinkActive = (link: string) => pathName === link
    return(
        <>
            {
                NavigationItems.map((item) => (
                    <Link href={item.link ? item.link : '#'} key={item.id} className={clsx('border-b pb-1 hover:border-secondary transition', {
                        'border-secondary font-medium': item.link && isLinkActive(item.link),
                        'border-transparent': !item.link || !isLinkActive(item.link)
                    })}>
                        <Typography
                                color={isLinkActive(item.link!) ? 'secondary' : 'primary' }
                                className='transition-[color]'
                                size='md'
                        >{getLanguage(item.title)}</Typography>
                    </Link>
                )
                )
            }
            <div className='border-b-[1px] hover:border-primary transition border-transparent'>
                <Dropdown title={getLanguage(CONTACTS_TITLE)} dropdownClassName='w-[265px] py-[20px]'>
                    <a href={`tel:${contacts.phone}`}>
                        <Option title={`+${contacts.phone}`} icon='call' className='gap-x-1 px-[5%] flex-1' />
                    </a>
                    <a href={`mailto:${contacts.email}`}>
                        <Option title={contacts.email} icon='email' className='gap-x-1 px-[5%] flex-1' />
                    </a>
                    <a href={generateGoogleMapsLink(getLanguage(contacts.address))} target='_blank' rel="noopener noreferrer">
                        <Option title={getLanguage(contacts.address)} icon='location' className='gap-x-1 px-[5%] flex-1' />
                    </a>
                </Dropdown>
            </div>

            <div className='border-b-[1px] hover:border-primary transition border-transparent'>
                <Dropdown title={language.toUpperCase()} onChange={onChangeLng} dropdownClassName='display felx justify-center'>
                    {Object.values(LanguageOptions.options).map((el) => (
                        <Option title={getLanguage(el.title)} key={el.id} id={el.id} className='px-4 cursor-pointer'/>
                    ))} 
                </Dropdown>
            </div>
        </>
    )
}