import axios from "@/axios";
import {ProductsPageDTO} from "@/backend/types";

export const editProductsPage = (body:ProductsPageDTO) => axios.put("/api/pages/products", body)