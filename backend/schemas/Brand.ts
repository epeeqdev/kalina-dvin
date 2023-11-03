import {Schema, model, models} from "mongoose";
import {ImageFragment, TitleFragment} from "@/backend/fragments";

const brandSchema = new Schema({
	name: TitleFragment,
	image: ImageFragment,
	slug: String
});

export const Brand = models.Brand || model('Brand', brandSchema, 'Brand');

