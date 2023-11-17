import {Typography} from "@/app/main/components/controls/typography";
import Image from "next/image";
import IconComponent from "@/components/icon";
import {CATEGORIES, CONTACTS, MAP} from "@/app/main/components/footer/constanst";
import { useLanguage } from "@/app/main/hooks/useLanguage";
import {NavigationItems} from "@/app/main/components/header/constants";
import {CategoryResponseDTO, ContactsPageDTO} from "@/backend/types";
import {
    FooterContactsBlock
} from "@/app/main/components/footer/components/footer-block/components/footer-contacts-block-item";
import {FooterBlock} from "@/app/main/components/footer/components/footer-block";
import {FooterBlockItem} from "@/app/main/components/footer/components/footer-block/components/footer-block-item";
import {generateGoogleMapsLink} from "@/utils/googleMaps";

interface Props {
    categories: CategoryResponseDTO[];
    contacts: ContactsPageDTO;
}

export const Footer = ({categories, contacts}:Props) => {
    const { getLanguage } = useLanguage();
    const categoriesData = categories?.slice(0,5)

    return(
        <div className='bg-primary w-full flex flex-col'>
            <div className='flex-1 pt-[14px] lg:pt-[48px] pb-[12px] lg:pb-[48px] pl-[7%] pr-[7.5%]'>
                <div className='flex flex-col lg:flex-row h-full'>
                    <div className='flex justify-start gap-x-[10%] lg:gap-x-0 pr-[48px] items-center lg:items-baseline lg:justify-between flex-row lg:flex-col border-r-[0] border-b-[1px] lg:border-r-[1px] lg:border-b-[0] border-secondary w-full max-w-full lg:max-w-[230px] xl:max-w-[383px] h-full'>
                        <div>
                            <Image src='/footerLogo.png' alt='footerLogo' width={152} height={60} className='w-[100px] lg:w-[152px] mb-4'/>
                        </div>
                        <div className='flex gap-x-3 mb-4'>
                            <a href={contacts.socialLinks.facebook} target='_blank' className='group hover:text-secondary'>
                                <IconComponent name='facebook' color='white' size='md' className='group-hover:text-secondary md:w-[24px] md:h-[24px] lg:w-[32px] lg:h-[32px]'/>
                            </a>
                            <a href={contacts.socialLinks.instagram} target='_blank' className='group hover:text-secondary'>
                                <IconComponent name='instagram' color='white'  size='md' className='group-hover:text-secondary md:w-[24px] md:h-[24px] lg:w-[32px] lg:h-[32px]'/>
                            </a>
                        </div>
                    </div>
                        <div className='grid grid-cols-4 lg:grid-cols-7 w-full mt-2'>
                            <div className='hidden lg:block lg:col-span-2 lg:col-start-2'>
                                <FooterBlock title={getLanguage(CATEGORIES)}>
                                    {categoriesData.map((item)=>(
                                        <FooterBlockItem title={getLanguage(item.name)} key={item._id} link={`/main/products?category=${item._id}`}/>
                                        ))}
                                </FooterBlock>
                            </div>
                            <div className='col-span-2'>
                                <FooterBlock title={getLanguage(MAP)}>
                                    {NavigationItems.map((item) =>(
                                        <FooterBlockItem title={getLanguage(item.title)} key={item.id} link={item.link}/>
                                    ))}
                                </FooterBlock>
                            </div>
                            <div  className='col-span-2'>
                                <FooterBlock title={getLanguage(CONTACTS)}>
                                    <FooterContactsBlock title={contacts.phone} icon='call' link={`tel:${contacts.phone}`}/>
                                    <FooterContactsBlock title={contacts.email} icon='email' link={`mailto:${contacts.email}`}/>
                                    <FooterContactsBlock title={getLanguage(contacts.address)} icon='location' link={generateGoogleMapsLink(getLanguage(contacts.address))} blankType/>
                                </FooterBlock>
                            </div>

                        </div>
                </div>
            </div>
            <div className='flex w-full justify-center items-center py-[5px] lg:py-[20px] border-t-[0.5px] border-secondary'>
                <Typography color='white' size='sm'>
                    © 2023 - Copyright | All rights Reserved</Typography>
            </div>
        </div>
    )
}