import axios from "@/axios";
import {Product} from "@/app/admin/main/products/types";


export const getProducts = async (search?: URLSearchParams) => axios<Product[]>(`/api/products?${search?.toString()}`)
