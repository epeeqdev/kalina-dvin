import axios from "@/axios";
import {CategoriesPageDTO} from "@/backend/types";

export const editCategoriesPage = (body:CategoriesPageDTO) => axios.put("/api/pages/categories", body)