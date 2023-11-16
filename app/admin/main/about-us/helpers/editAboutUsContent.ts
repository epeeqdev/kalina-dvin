import axios from "@/axios";
import {AboutUsDTO} from "@/backend/types";

export const editAbout = (body: AboutUsDTO) => axios.put(`/api/pages/about-us`, body);