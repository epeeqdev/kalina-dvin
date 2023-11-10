import axios from "@/axios";
import {BrandRequestDTO} from "@/backend/types";

export const addBrand = (body:BrandRequestDTO) => axios.post(`/api/brand`, body);