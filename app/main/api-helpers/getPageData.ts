import {getCurrentUrl} from "@/utils/heplers";
import axios from "axios";
import {AboutUsDTO, CategoryResponseDTO, ContactsPageDTO} from "@/backend/types";

export const getPageData = async () => {
    const origin = getCurrentUrl();
    const [categories, contacts, aboutUS] =
        await Promise.all(
          [axios.get<CategoryResponseDTO[]>(`${origin}/api/categories`),
                 axios.get<ContactsPageDTO>(`${origin}/api/pages/contacts`),
                axios.get<AboutUsDTO>(`${origin}/api/pages/about-us`),
              ]);
    return [categories.data, contacts.data, aboutUS.data] as [CategoryResponseDTO[], ContactsPageDTO, AboutUsDTO]
}