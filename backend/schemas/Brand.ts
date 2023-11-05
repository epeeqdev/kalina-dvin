import {Schema, model, models} from "mongoose";
import {ImageFragment, TitleFragment} from "@/backend/fragments";

const brandSchema = new Schema({
	name: {
		en: String,
		ru: String,
		am: String,
	},
	image: {
		id: String,
		extension: String,
		src: String,
	},
	slug: String
});

export const Brand = models.Brand || model('Brand', brandSchema, 'Brand');

