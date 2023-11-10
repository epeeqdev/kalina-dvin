import axios from "@/axios";

export const deleteBrand = (id : string) => axios.delete(`/api/brand/${id}`);