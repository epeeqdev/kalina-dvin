import axios from "@/axios";


export const deleteProduct = (id : string) => axios.delete(`/api/product/${id}`);