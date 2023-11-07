import {Schema, model, models} from "mongoose";

const imageSchema = new Schema({  image: { data: Buffer, contentType: String } });

export const Image = models.Image || model('Image', imageSchema);

