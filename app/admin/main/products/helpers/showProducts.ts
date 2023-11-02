import axios from "axios";
import {Product} from "@/app/admin/main/products/types";


export const getProducts = async () => {
    try{
        return await axios<Product[]>('/api/products');
    }catch (e){
        console.log(e)
    }
}
