import axios from "@/axios";
export const deleteAbout = () => axios.delete(`/api/about`)