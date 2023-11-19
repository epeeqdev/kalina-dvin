import {Schema, model, models} from "mongoose";

const ProductsPageSchema = new Schema({
    image: { type: Schema.Types.ObjectId,ref: 'Image', required: true },
});

export const ProductsPage = models.ProductsPage || model('ProductsPage', ProductsPageSchema, 'ProductsPage');

