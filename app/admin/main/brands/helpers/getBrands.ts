import axios from "@/axios";

export const getBrands = () => axios.get(`/api/brands`)