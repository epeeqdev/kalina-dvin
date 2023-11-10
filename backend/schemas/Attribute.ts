import {Schema, model, models} from "mongoose";
import {TextFragment} from "@/backend/fragments";

const attributeSchema = new Schema({
	name: TextFragment,
	});

export const Attribute = models.Attribute || model('Attribute', attributeSchema);

