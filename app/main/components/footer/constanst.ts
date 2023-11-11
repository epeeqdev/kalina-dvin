export const FooterItemsBlog = {
    categories: {
        id: 'categories',
        title: {am: 'Կատեգորիաներ', ru: 'Категории'},
        items: [
            {
                title: {am: 'Վերնագիր', ru: 'Заголовок'},
                id: 1,
                link: '/about-us'
            },
            {
                title: {am: 'Վերնագիր', ru: 'Заголовок'},
                id: 2,
                link: '/about-us'
            },
            {
                title: {am: 'Վերնագիր', ru: 'Заголовок'},
                id: 3,
                link: '/about-us'
            },
            {
                title: {am: 'Վերնագիր', ru: 'Заголовок'},
                id: 4,
                link: '/about-us'
            }
        ],
        classNames: 'hidden lg:flex'
    },
    map: {
        id: 'map',
        title: {am: 'Կայքի Քարտեզ', ru: 'Карта сайта'},
        items: [
            {
                title: {am: 'Գլխավոր', ru: 'Главная'},
                id: 1,
                link: '/main'
            },
            {
                title: {am: 'Մեր մասին', ru: 'О Нас'},
                id: 2,
                link: '/about-us'
            },
            {
                title: {am: 'Կատեգորիաներ', ru: 'Категории'},
                id: 3,
                link: '/categories'
            }
        ],
        classNames:'flex'
    },
    contacts: {
        id: 'contacts',
        title: {am: 'Կապ', ru: 'Контакты'},
        items: [
            {id: 1, title:{am: '+374 XX XXXXXX', ru: '+374 XX XXXXXX'}, icon: 'phone'},
            {id: 2, title: {am: 'LoremIpsum.com', ru: ''}, icon: 'email'},
            {id: 3, title: {am: 'Lorem Ipsum', ru: ''}, icon: 'location'},
        ],
        classNames:'flex'
    }
}