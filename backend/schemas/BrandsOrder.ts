import {Schema, model, models} from "mongoose";

const brandsOrderSchema = new Schema({
    order: {
        type: Array
    }
});

export const BrandsOrder = models.BrandsOrder || model('BrandsOrder', brandsOrderSchema);

