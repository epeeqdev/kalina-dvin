import axios from "@/axios";

export interface AboutUs{
    mainPage: {
        am: string,
        ru: string
    },
    aboutUsPage: {
        top: {am: string, ru: string },
        bottom: {am: string, ru: string },
    },
    image:{
        src: string;
        id: string;
        extension: string;
    }
}


export const addAbout = (body: AboutUs) => axios.post(`/api/About`, body);