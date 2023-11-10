import axios from "@/axios";
import {CategoryRequestDTO} from "@/backend/types";

export const editCategory = (id : string, body: CategoryRequestDTO) => id && axios.put(`/api/category/${id}`, body);