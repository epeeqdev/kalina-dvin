import {Typography} from "@/app/main/components/controls/typography";
import {NavigationItems} from "@/app/main/components/header/constants";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {ContactsPageDTO} from "@/backend/types";
import {
    MobileContactItem
} from "@/app/main/components/header/components/mobile-navigation/components/mobile-contact-item";

interface Props {
    contacts: ContactsPageDTO
}

export const MobileNavigation = ({contacts}: Props) => {
    const {getLanguage} = useLanguage()
    return(
        <div>
            <div className='py-3 border-b border-secondary cursor-pointer select-none' >
                {Object.values(NavigationItems).map((el) => (
                    <div key={el.id} className='flex flex-col pl-6 py-2 bg-white group hover:bg-secondary hover:text-white'>
                        <Typography  size='sm' className='group-hover:text-white'>{getLanguage(el.title)}</Typography>
                    </div>
                ))}
            </div>
            <div className='cursor-pointer select-none pt-3'>
                <a href=''>
                    <MobileContactItem title={contacts.phone} icon='call'/>
                </a>
                <a href=''>
                    <MobileContactItem title={contacts.email} icon='email'/>
                </a>
                <a href=''>
                    <MobileContactItem title={getLanguage(contacts.address)} icon='location'/>
                </a>
            </div>
        </div>
    )
}