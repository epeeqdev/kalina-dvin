import axios from "axios";
import {CategoryResponseDTO} from "@/backend/types";


export const getCategories = async () => axios<CategoryResponseDTO[]>(`/api/categories`)
