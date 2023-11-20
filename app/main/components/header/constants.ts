'use client'
import {ContactsType, NavigationItemsType} from "@/app/main/components/header/types";

export const NavigationItems:  NavigationItemsType[] = [

   {
        id: 'general',
        title: { am: 'Գլխավոր', ru: 'Главная' },
        link: '/main',
    },
    {
        id: 'categories',
        title: {am: 'Կատեգորիաներ', ru: 'Категории'},
        link: '/main/categories',
    },
    {
        id: 'products',
        title: {am: 'Ապրանքներ', ru: 'Продукты'},
        link: '/main/products',
    },
     {
        id: 'about',
        title: {am: 'Մեր մասին', ru: 'О Нас'},
        link: '/main/about-us'
    },
]
export const LanguageOptions: ContactsType = {
    options: [
        {id: 'am', title:{am: 'AM', ru: 'AM'}, isChanged: true},
        {id: 'ru', title: {ru: 'RU', am: 'RU'}, isChanged: true}
    ],
}
export const CONTACTS_TITLE = { am:'Կապ', ru: 'Контакты' }