import axios from "@/axios";
import {API_ROUTES} from "@/app/api/constants";

export const updateOrderBrands = (order : string[]) => axios.put(API_ROUTES.reorder.brands, {order});