import {Product} from "@/app/admin/main/products/types";
import axios from "@/axios";


export const addProduct = (body:Product) => axios.post(`/api/product`, body);