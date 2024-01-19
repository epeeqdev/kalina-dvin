import * as yup from "yup";

/** Error messages */
export const REQUIRED_FIELD_TEXT = {am :'Պարտադիր լրացման դաշտ', ru: "Обязательное поле"};
export const REQUIRED_IMAGE = {am :'Պարտադիր ավելացրեք նկարը', ru: "Обязательно добавить картинку"};
export const REQUIRED_EMAIL_FIELD_TEXT = {am :'Նշեք վավեր հասցե', ru: "Укажите корректную эл. почту"};


/** Schemas */
export const IMAGE_SCHEMA = yup.object().shape({src: yup.string().required(), id: yup.string().required(), extension: yup.string()});
export const OPTION_SCHEMA = yup.object().shape({label: yup.string(), value: yup.string()});
export const OPTION_SCHEMA_REQUIRED = yup.object().shape({label: yup.string().required(REQUIRED_FIELD_TEXT), value: yup.string().required(REQUIRED_FIELD_TEXT)});
export const TEXT_SCHEMA = yup.object().shape({am: yup.string(), ru: yup.string()})
export const TEXT_SCHEMA_REQUIRED = yup.object().shape({am: yup.string().required(REQUIRED_FIELD_TEXT), ru: yup.string().required(REQUIRED_FIELD_TEXT)})



/** Types */

export interface SchemaImage {
    src: string;
    extension: string;
    id: string;
}
export interface SchemaOption {
   label:string;
   value:string;
}
export interface SchemaText {
    am: string ;
    ru: string;
}
