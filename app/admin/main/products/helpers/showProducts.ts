import axios from "@/axios";
import {Product} from "@/app/admin/main/products/types";


export const getProducts = async (search: URLSearchParams) => {
    console.log('search', search.toString())
    try{
        return axios<Product[]>(`/api/products?${search.toString()}`);
    }catch (e){
        console.log(e)
    }
}
