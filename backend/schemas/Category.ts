import {Schema, model, models} from "mongoose";
import {ImageFragment, TitleFragment} from "@/backend/fragments";

const categorySchema = new Schema({
	name: TitleFragment,
	image: ImageFragment,
	slug: String,
});

export const Category = models.Category || model('Category', categorySchema, 'Category');

