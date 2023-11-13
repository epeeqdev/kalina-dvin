import {Schema, model, models} from "mongoose";
import {ImageFragment} from "@/backend/fragments";

const CategoriesPageSchema = new Schema({
    image: {...ImageFragment},
});

export const CategoriesPage = models.CategoriesPage || model('CategoriesPage', CategoriesPageSchema, 'CategoriesPage');

