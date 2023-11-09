import axios from "@/axios";

export const deleteCategory = (id : string) => axios.delete(`/api/category/${id}`);