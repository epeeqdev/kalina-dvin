'use client'
import {NavigationItemsType} from "@/app/main/components/header/types";

export const NavigationItems: Record<string, NavigationItemsType> = {
    general:{
        id: 'general',
        title: { am: 'Գլխավոր', ru: 'Главная' },
        link: '/main',


    },
    categories:{
        id: 'categories',
        title: {am: 'Կատեգորիաներ', ru: 'Категории'},
        link: '/main/categories',
    },
    about: {
        id: 'about',
        title: {am: 'Մեր մասին', ru: 'О Нас'},
        link: '/main/about-us'
    },
}
export const LanguageOptions = {
    id: 'lng',
    options: [
        {id: 'am', title:{am: 'AM'}, isChanged: true},
        {id: 'ru', title: {ru: 'RU'}, isChanged: true}
    ],
    title: {am: 'AM', ru: 'RU'},
    dropdownClassname: {container: 'w-127px', items: 'justify-center'}
}
export const ContactsOptions = {
    id: 'contact',
    title: { am:'Կապ', ru: 'Контакты' },
    options: [
        {id: 'phone', title:{am: '+374 XX XXXXXX', ru: '+374 XX XXXXXX'}, icon: 'phone', isChanged: false},
        {id: 'email', title: {am: 'LoremIpsum.com', ru: ''}, icon: 'email', isChanged: false},
        {id: 'location', title: {am: 'Lorem Ipsum', ru: ''}, icon: 'location', isChanged: false},
    ],
    isSelect: true,
    dropdownClassname: {container: 'w-[265px]', items: 'gap-x-[5%] pl-[7.5%] flex-1'}
}
