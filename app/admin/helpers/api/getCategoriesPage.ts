import axios from "@/axios";

export const getCategoriesPage = () => axios.get(`/api/pages/categories`);