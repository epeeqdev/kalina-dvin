import {Schema, model, models} from "mongoose";

const categorySchema = new Schema({
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
	slug: String,
});

export const Category = models.Category || model('Category', categorySchema, 'Category');

