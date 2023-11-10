import axios from "@/axios";

export const deleteAttribute = (id : string) => axios.delete(`/api/attribute/${id}`);