import axios from "@/axios";

export const getAttributes = () => axios.get(`/api/attributes`);