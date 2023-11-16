export enum APIMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export const API_ROUTES = {
    attributes: '/api/attributes',
    attribute: '/api/attribute',
    brands: '/api/brands',
    brand: '/api/brand',
    categories: '/api/categories',
    category: '/api/category',
    products: '/api/products',
    product: '/api/product',
    user: '/api/getUser',
    login: '/api/login',
    pages: {
        mainPage:'/api/pages/main-slider',
        aboutUs:'/api/pages/about-us',
        contacts:'/api/pages/contacts',
        categories:'/api/pages/categories',
        products:'/api/pages/products'
    }
}

export const PROTECTED_ROUTES = {
    [API_ROUTES.attribute]: [APIMethods.POST, APIMethods.PUT, APIMethods.DELETE],
    [API_ROUTES.brand]: [APIMethods.POST, APIMethods.PUT, APIMethods.DELETE],
    [API_ROUTES.category]: [APIMethods.POST, APIMethods.PUT, APIMethods.DELETE],
    [API_ROUTES.product]: [APIMethods.POST, APIMethods.PUT, APIMethods.DELETE],
    [API_ROUTES.user]: [APIMethods.GET, APIMethods.POST],
    [API_ROUTES.pages.mainPage]: [APIMethods.PUT],
    [API_ROUTES.pages.contacts]: [APIMethods.PUT],
    [API_ROUTES.pages.categories]: [APIMethods.PUT],
    [API_ROUTES.pages.products]: [APIMethods.PUT],
    [API_ROUTES.pages.aboutUs]: [APIMethods.PUT],
}