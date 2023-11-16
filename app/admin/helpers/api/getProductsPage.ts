import axios from "@/axios";

export const getProductsPage = () => axios.get(`/api/pages/products`);