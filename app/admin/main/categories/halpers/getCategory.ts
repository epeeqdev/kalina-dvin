import axios from "@/axios";

export const getCategory = (id : string) => axios.get(`/api/category/${id}`);