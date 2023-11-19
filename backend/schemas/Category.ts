import {Schema, model, models} from "mongoose";

const categorySchema = new Schema({
	name: {
		en: String,
		ru: String,
		am: String,
	},
	image: { type: Schema.Types.ObjectId,ref: 'Image'},
});

export const Category = models.Category || model('Category', categorySchema, 'Category');

