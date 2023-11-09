import axios from "@/axios";

export const getBrand = (id : string) => axios.get(`/api/brand/${id}`);