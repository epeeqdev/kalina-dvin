import axios from "@/axios";
import {ProductResponseDTO} from "@/backend/types";


export const getProducts = async (search?: URLSearchParams) => axios<ProductResponseDTO[]>(`/api/products?${search?.toString()}`)
