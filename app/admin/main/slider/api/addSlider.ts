import axios from "@/axios";
import {MainPageSliderDTO} from "@/backend/types";

export const addSlider = (body: MainPageSliderDTO) => axios.put("/api/pages/main-slider", body)