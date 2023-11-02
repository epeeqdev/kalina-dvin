import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
	{
		title: { type: String},
		description: { type: String },
		images: { type: Array, required: true },
		categories: { type: Array },
		attributes: { type: Array },
	},
	{ timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
