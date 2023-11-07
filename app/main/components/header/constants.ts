'use client'
import {NavigationItemsType} from "@/app/main/components/header/types";

export const NavigationItems: Record<string, NavigationItemsType> = {
    general:{
        id: 'general',
        title: { arm: 'Գլխավոր', ru: 'Главная' },
        link: '/main',


    },
    categories:{
        id: 'categories',
        title: {arm: 'Կատեգորիաներ', ru: 'Категории'},
        link: '/main/categories',
    },
    about: {
        id: 'about',
        title: {arm: 'Մեր մասին', ru: 'О Нас'},
        link: '/main/about-us'
    },
    contacts: {
        id: 'contact',
        title: { arm:'Կապ', ru: 'Контакты' },
        options: [
            {id: 'phone', title:{arm: '+374 XX XXXXXX', ru: '+374 XX XXXXXX'}, icon: 'phone', isChanged: false},
            {id: 'email', title: {arm: 'LoremIpsum.com', ru: ''}, icon: 'email', isChanged: false},
            {id: 'location', title: {arm: 'Lorem Ipsum', ru: ''}, icon: 'location', isChanged: false},
        ],
        isSelect: true,
        dropdownClassname: {container: 'w-[265px]', items: 'gap-x-[5%] pl-[7.5%] flex-1'}
    },
    languages: {
        id: 'lng',
        title: {arm: 'ARM', ru: 'RUS'},
        options: [
            {id: 'arm', title:{arm: 'ARM'}, isChanged: true},
            {id: 'ru', title: {ru: 'RUS'}, isChanged: true}
        ],
        isSelect: true,
        dropdownClassname: {container: 'w-127px', items: 'justify-center'}
    }

}