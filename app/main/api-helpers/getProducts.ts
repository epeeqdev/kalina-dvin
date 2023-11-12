import axios from "axios";
import {ProductResponseDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";
import {getCurrentUrl} from "@/utils/heplers";


export const getProducts = async (search?: any) => {
    const origin = getCurrentUrl();
    const res = await axios<ProductResponseDTO[]>(`${origin}${API_ROUTES.products}?${new URLSearchParams(search)?.toString()}`);
    return res.data;
}
