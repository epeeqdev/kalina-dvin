import {Typography} from "@/app/main/components/controls/typography";
import {NavigationItems} from "@/app/main/components/header/constants";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {ContactsPageDTO} from "@/backend/types";
import {
    MobileContactItem
} from "@/app/main/components/header/components/mobile-navigation/components/mobile-contact-item";
import {generateGoogleMapsLink} from "@/utils/googleMaps";

interface Props {
    contacts: ContactsPageDTO;
    onClick: (link: string) => void
}

export const MobileNavigation = ({contacts, onClick}: Props) => {
    const {getLanguage} = useLanguage()
    return(
        <div>
            <div className='py-3 border-b border-secondary cursor-pointer select-none' >
                {Object.values(NavigationItems).map((el) => (
                    <div key={el.id} className='flex flex-col pl-6 py-2 bg-white group hover:bg-secondary hover:text-white' onClick={()=>onClick(el.link)}>
                        <Typography  size='lg' className='group-hover:text-white'>{getLanguage(el.title)}</Typography>
                    </div>
                ))}
            </div>
            <div className='cursor-pointer select-none py-3 border-b border-secondary'>
                <a href={`tel:${contacts.phone}`}>
                    <MobileContactItem title={`+${contacts.phone}`} icon='call'/>
                </a>
                <a href={`mailto:${contacts.email}`}>
                    <MobileContactItem title={contacts.email} icon='email'/>
                </a>
                <a href={generateGoogleMapsLink(getLanguage(contacts.address))} target='_blank' rel='noopener noreferrer'>
                    <MobileContactItem title={getLanguage(contacts.address)} icon='location'/>
                </a>
            </div>
        </div>
    )
}