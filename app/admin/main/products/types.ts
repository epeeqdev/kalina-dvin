import {Image} from "@/app/admin/types";
import {Control} from "react-hook-form";

export type Categories = {
    value: string;
    label: string
}
export interface Product {
    _id?: string;
    title: string;
    description : string;
    images: Image[];
    categories : string[];
    brand: string;
    attributes : ProductAttribute[]
}
export interface Brand {
    _id?: string;
    title: Text;
    image: Image;
}

export interface ProductAttribute {
    name: string;
    value: string;
    id: string;
}



export interface ImageType{
    src: string;
    id: string;
    extension: string;
}

export interface Text {
    en: string;
    ru: string;
    am: string;
}
export interface CategoriesItem {
    name: {
        en : string,
        ru : string,
        am : string
    },
    _id: string
}

