import axios from "axios";
import {BrandResponseDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";
import {getCurrentUrl} from "@/utils/heplers";


export const getBrands = async () => {
    const origin = getCurrentUrl();
    const req = await axios<BrandResponseDTO[]>(`${origin}${API_ROUTES.brands}`);
    return req.data;
}
