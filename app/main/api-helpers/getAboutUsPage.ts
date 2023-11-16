import axios from "axios";
import {AboutUsDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";
import {getCurrentUrl} from "@/utils/heplers";


export const getAboutUsPage = async () => {
    const origin = getCurrentUrl();
    const req = await axios<AboutUsDTO>(`${origin}${API_ROUTES.pages.aboutUs}`);
    return req.data;
}
