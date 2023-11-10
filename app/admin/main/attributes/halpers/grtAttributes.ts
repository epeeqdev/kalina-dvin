import axios from "@/axios";

export const getAttribute = (id : string) => axios.get(`/api/attribute/${id}`);