import {Schema, model, models} from "mongoose";

const brandSchema = new Schema({
	name: {
		ru: String,
		am: String,
	},
	image: { type: Schema.Types.ObjectId, ref: 'Image'},
});

export const Brand = models.Brand || model('Brand', brandSchema, 'Brand');

