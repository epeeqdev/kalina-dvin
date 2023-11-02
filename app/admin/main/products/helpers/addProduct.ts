import {Product} from "@/app/admin/main/products/types";
import axios from "@/axios";


export const addProduct = async (body:Product) => {
    try{
        return axios.post(`/api/product`, body);
    }catch (e){
        console.log(e)
    }
}
