import axios from "@/axios";
import {AttributeRequestDTO} from "@/backend/types";

export const editAttribute = (id : string, body: AttributeRequestDTO) => axios.put(`/api/attribute/${id}`, body)