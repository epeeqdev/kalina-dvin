import {Schema, model, models} from "mongoose";
import {ImageFragment} from "@/backend/fragments";

const ProductsPageSchema = new Schema({
    image: {...ImageFragment},
});

export const ProductsPage = models.ProductsPage || model('ProductsPage', ProductsPageSchema, 'ProductsPage');

