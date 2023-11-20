import axios from "axios";
import {ProductsPageDTO} from "@/backend/types";
import {API_ROUTES} from "@/app/api/constants";
import {getCurrentUrl} from "@/utils/heplers";


export const getProductsPage = async () => {
    const origin = getCurrentUrl();
    const req = await axios<ProductsPageDTO>(`${origin}${API_ROUTES.pages.products}`);
    return req.data;
}
