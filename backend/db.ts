import mongooseLib from 'mongoose';
import User from "@/backend/schemas/User";
import Product from "@/backend/schemas/Product";
const mongoose = mongooseLib as any;

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise;

export const db = {
	User,
	Product
};
