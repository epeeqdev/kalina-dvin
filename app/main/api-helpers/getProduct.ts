import {getCurrentUrl} from "@/utils/heplers";
import axios from "axios";
import {ProductResponseDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";

export const getProduct = async (search?: string | string[]) => {
    const origin = getCurrentUrl();
    const res = await axios<ProductResponseDTO>(`${origin}${API_ROUTES.product}/${search}`);
    return res.data;
}
