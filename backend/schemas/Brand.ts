import {Schema, model, models} from "mongoose";

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
});

export const Brand = models.Brand || model('Brand', brandSchema, 'Brand');

