import axios from "@/axios";

export const getSliderData = () => axios.get("/api/pages/main-slider")