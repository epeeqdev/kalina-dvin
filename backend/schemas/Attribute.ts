import {Schema, model, models} from "mongoose";
import {TitleFragment} from "@/backend/fragments";

const attributeSchema = new Schema({
	name: TitleFragment,
	});

export const Attribute = models.Attribute || model('Attribute', attributeSchema);

