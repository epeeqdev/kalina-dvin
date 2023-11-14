import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import {LayoutWrapper} from "@/app/main/layoutWrapper";
import axios from "axios";
import {getCurrentUrl} from "@/utils/heplers";
import {CategoryResponseDTO, ContactsPageDTO} from "@/backend/types";
import {getPageData} from "@/app/main/api-helpers/getPageData";

export default async function MainLayout({children}:React.PropsWithChildren){
    const [categories, contacts,_] = await getPageData();
    return <LayoutWrapper categories={categories} contacts={contacts}>
        {children}
    </LayoutWrapper>
}