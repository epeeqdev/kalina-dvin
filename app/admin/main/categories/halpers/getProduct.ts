import {ProductResponseDTO} from "@/backend/types";
import axios from "@/axios";
import {API_ROUTES} from "@/app/api/constants";

export const getProduct = (id:string) => axios.get<ProductResponseDTO>(`${API_ROUTES.product}/${id}`);