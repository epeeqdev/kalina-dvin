import axios from "@/axios";
import {Product} from "@/app/admin/main/products/types";


export const editProduct = (id : string, body: Product) => axios.put(`/api/product/${id}`, body);