import {Image} from "@/app/admin/types";

export interface Product {
    _id?: string;
    title: string;
    description : string;
    images: Image[];
    categories : string[];
    attributes : ProductAttribute[]
}

export interface ProductAttribute {
    name: string;
    value: string;
    id: string;
}

type Categories = {
    value: string;
    label: string
}

export interface Options {
    control: any
    name: string;
    options: Categories[];
}

export interface ImageType{
    image: string;
    id: string
}


