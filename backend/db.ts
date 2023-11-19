import mongoose from 'mongoose';
import User from "@/backend/schemas/User";
import Product from "@/backend/schemas/Product";
import {Attribute} from "@/backend/schemas/Attribute";
import {Brand} from "@/backend/schemas/Brand";
import {Category} from "@/backend/schemas/Category";
import MainPageSlider from "@/backend/schemas/MainPageSlider";
import AboutUs from "@/backend/schemas/AboutUsPage";
import {ProductsPage} from "@/backend/schemas/ProductsPage";
import {CategoriesPage} from "@/backend/schemas/CategoriesPage";
import {ContactsPage} from "@/backend/schemas/ContactsPage";
import {Image} from "@/backend/schemas/Image";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = Promise;

export const DB = {
	User,
	Product,
	Attribute,
	Brand,
	Category,
	MainPageSlider,
	AboutUs,
	ProductsPage,
	CategoriesPage,
	ContactsPage,
	Image
};
