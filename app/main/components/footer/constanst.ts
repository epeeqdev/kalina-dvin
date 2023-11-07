export const FooterItemsBlog = {
    categories: {
        id: 'categories',
        title: {arm: 'Կատեգորիաներ', ru: 'Категории'},
        items: [
            {
                title: {arm: 'Վերնագիր', ru: 'Заголовок'},
                id: 1,
                link: '/about-us'
            },
            {
                title: {arm: 'Վերնագիր', ru: 'Заголовок'},
                id: 2,
                link: '/about-us'
            },
            {
                title: {arm: 'Վերնագիր', ru: 'Заголовок'},
                id: 3,
                link: '/about-us'
            },
            {
                title: {arm: 'Վերնագիր', ru: 'Заголовок'},
                id: 4,
                link: '/about-us'
            }
        ],
        classNames: 'hidden lg:flex'
    },
    map: {
        id: 'map',
        title: {arm: 'Կայքի Քարտեզ', ru: 'Карта сайта'},
        items: [
            {
                title: {arm: 'Գլխավոր', ru: 'Главная'},
                id: 1,
                link: '/main'
            },
            {
                title: {arm: 'Մեր մասին', ru: 'О Нас'},
                id: 2,
                link: '/about-us'
            },
            {
                title: {arm: 'Կատեգորիաներ', ru: 'Категории'},
                id: 3,
                link: '/categories'
            }
        ],
        classNames:'flex'
    },
    contacts: {
        id: 'contacts',
        title: {arm: 'Կապ', ru: 'Контакты'},
        items: [
            {id: 1, title:{arm: '+374 XX XXXXXX', ru: '+374 XX XXXXXX'}, icon: 'phone'},
            {id: 2, title: {arm: 'LoremIpsum.com', ru: ''}, icon: 'email'},
            {id: 3, title: {arm: 'Lorem Ipsum', ru: ''}, icon: 'location'},
        ],
        classNames:'flex'
    }
}