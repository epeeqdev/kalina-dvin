import axios from "@/axios";
import {BrandRequestDTO} from "@/backend/types";

export const editBrand = (id : string, body: BrandRequestDTO) => axios.put(`/api/brand/${id}`, body);