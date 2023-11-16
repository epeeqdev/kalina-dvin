import axios from "axios";
import {ContactsPageDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";
import {getCurrentUrl} from "@/utils/heplers";


export const getContactsPage = async () => {
    const origin = getCurrentUrl();
    const req = await axios<ContactsPageDTO>(`${origin}${API_ROUTES.pages.contacts}`);
    return req.data;
}
