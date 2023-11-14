import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import {LayoutWrapper} from "@/app/main/layoutWrapper";
import axios from "axios";
import {getCurrentUrl} from "@/utils/heplers";
import {CategoryResponseDTO, ContactsPageDTO} from "@/backend/types";

const getPageData = async () => {
    const origin = getCurrentUrl();
    const [categories, contacts] = await Promise.all([axios.get<CategoryResponseDTO[]>(`${origin}/api/categories`), axios.get<ContactsPageDTO>(`${origin}/api/pages/contacts`)]);
    return [categories.data, contacts.data] as [CategoryResponseDTO[], ContactsPageDTO]
}
export default async function MainLayout({children}:React.PropsWithChildren){
    const [categories, contacts] = await getPageData();
    return <LayoutWrapper categories={categories} contacts={contacts}>
        {children}
    </LayoutWrapper>
}