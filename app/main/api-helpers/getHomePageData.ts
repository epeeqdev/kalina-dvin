import {getCategories} from "@/app/main/api-helpers/getCategories";
import {getContactsPage} from "@/app/main/api-helpers/getContactsPage";
import {getAboutUsPage} from "@/app/main/api-helpers/getAboutUsPage";
import {getMainPage} from "@/app/main/api-helpers/getMainPage";
import {getBrands} from "@/app/main/api-helpers/getBrands";

export const getHomePageData = () => {
    return Promise.all([
        getMainPage(),
        getCategories(),
        getBrands(),
        getContactsPage(),
        getAboutUsPage(),
    ]);
}