import mongoose from 'mongoose';
import User from "@/backend/schemas/User";
import Product from "@/backend/schemas/Product";
import {Attribute} from "@/backend/schemas/Attribute";
import {Brand} from "@/backend/schemas/Brand";
import {Category} from "@/backend/schemas/Category";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = Promise;

export const DB = {
	User,
	Product,
	Attribute,
	Brand,
	Category
};
