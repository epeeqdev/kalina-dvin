import { Schema, model, models } from 'mongoose';
import {ImageFragment, TextFragment} from "@/backend/fragments";

const ProductSchema = new Schema(
	{
		title: { type: {...TextFragment}, required: true },
		description: { type: {...TextFragment}, required: true },
		images: { type: [{...ImageFragment}], required: true },
		categories: { type: [{type: Schema.Types.ObjectId, ref: 'Category'}], required: true },
		attributes: [{value: {...TextFragment}, attribute: { type: Schema.Types.ObjectId, ref: 'Attribute'}}],
		brand: {type: Schema.Types.ObjectId, required: true, ref: 'Brand'}
	},
	{ timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
