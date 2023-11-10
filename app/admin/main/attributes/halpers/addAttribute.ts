import axios from "@/axios";
import {AttributeRequestDTO} from "@/backend/types";

export const addAttribute = (body:AttributeRequestDTO) => axios.post(`/api/attribute`, body);