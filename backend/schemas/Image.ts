import {Schema, model, models} from "mongoose";
import {ImageFragment} from "@/backend/fragments";

const imageSchema = new Schema({
    ...ImageFragment
});

export const Image = models.Image || model('Image', imageSchema);

