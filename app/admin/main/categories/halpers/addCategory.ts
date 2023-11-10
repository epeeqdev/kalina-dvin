import axios from "@/axios";
import {CategoryRequestDTO} from "@/backend/types";

export const addCategory = (body:CategoryRequestDTO) => axios.post(`/api/category`, body);