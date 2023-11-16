import axios from "axios";
import {MainPageSliderDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";
import {getCurrentUrl} from "@/utils/heplers";


export const getMainPage = async () => {
    const origin = getCurrentUrl();
    const req = await axios<MainPageSliderDTO>(`${origin}${API_ROUTES.pages.mainPage}`);
    return req.data;
}
