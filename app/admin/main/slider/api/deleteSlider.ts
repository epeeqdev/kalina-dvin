import axios from "@/axios";
import {MainPageSliderDTO} from "@/backend/types";

export const sliderDelete = (body: MainPageSliderDTO) => axios.put(`/api/main-slider`, body)