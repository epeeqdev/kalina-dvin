import axios from "axios";
import {CategoriesPageDTO, CategoryResponseDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";
import {getCurrentUrl} from "@/utils/heplers";


export const getCategoriesPage = async () => {
    const origin = getCurrentUrl();
    const req = await axios<CategoriesPageDTO>(`${origin}${API_ROUTES.pages.categories}`);
    return req.data;
}