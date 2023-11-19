import {Schema, model, models} from "mongoose";

const CategoriesPageSchema = new Schema({
    image: { type: Schema.Types.ObjectId,ref: 'Image'},
});

export const CategoriesPage = models.CategoriesPage || model('CategoriesPage', CategoriesPageSchema, 'CategoriesPage');

