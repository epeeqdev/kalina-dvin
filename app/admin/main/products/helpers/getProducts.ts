import axios from "@/axios";
import {ProductResponseDTO} from "@/backend/types";


export const getProductsWithSearch = async (search?: URLSearchParams) => axios<ProductResponseDTO[]>(`/api/products?${search?.toString()}`)

export const getProducts = async () => axios.get(`/api/products`)
