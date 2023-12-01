import {Schema, model, models} from "mongoose";

const categoriesOrderSchema = new Schema({
    order: {
        type: Array
    }
});

export const CategoriesOrder = models.BrandsOrder || model('CategoriesOrder', categoriesOrderSchema);

