import axios from "@/axios";
import {API_ROUTES} from "@/app/api/constants";

export const setOrderCategories = (order : string[]) => axios.put(API_ROUTES.reorder.categories, {order});