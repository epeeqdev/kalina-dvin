import axios from "axios";
import {CategoryResponseDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";
import {getCurrentUrl} from "@/utils/heplers";


export const getCategories = async () => {
    const origin = getCurrentUrl();
    const req = await axios<CategoryResponseDTO[]>(`${origin}${API_ROUTES.categories}`);
    return req.data;
}
