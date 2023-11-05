import {DB} from "@/backend/db";
import {NextResponse} from "next/server";
import product from "@/backend/schemas/Product";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	try{
		const searchParams = new URLSearchParams(request.url?.slice(request.url?.indexOf('?')));

		const brandQuery = searchParams?.get('brandId');
		const categoryQuery = searchParams?.get('categoryId');

		const products = await DB.Product.find({
		...(categoryQuery ? {categories: {
				$in: categoryQuery,
			}}:{}),
			...(brandQuery ? {brand: {
					$in: brandQuery,
				}}:{}),
		});

		const categories = await Promise.all(products?.map((product) => Promise.all(product.categories.map(item => DB.Category.findById(item)))));
		const brands = await Promise.all(products?.map((product) => DB.Brand.findById(product.brand)));
		const productsFilled = Array.from(products).map((item, index) => {
			const productCategories = categories?.[index] ?? [];
			const brand = brands?.[index];
			return {...item._doc, categories:productCategories, brand}
		})
		// console.log(productsFilled)
		return NextResponse.json(productsFilled);
	}catch(err){
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}

}
