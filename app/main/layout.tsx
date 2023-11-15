import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import {LayoutWrapper} from "@/app/main/layoutWrapper";
import {getCategories} from "@/app/main/api-helpers/getCategories";
import {getContactsPage} from "@/app/main/api-helpers/getContactsPage";

export default async function MainLayout({children}:React.PropsWithChildren){
    const [categories, contacts] = await Promise.all([getCategories(), getContactsPage()])
    return <LayoutWrapper categories={categories} contacts={contacts}>
        {children}
    </LayoutWrapper>
}