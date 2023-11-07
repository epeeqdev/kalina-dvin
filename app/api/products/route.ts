import {DB} from "@/backend/db";
import {NextResponse} from "next/server";
import {Product} from "@/app/admin/main/products/types";


export async function GET(request: Request) {
	try {
		const searchParams = new URLSearchParams(request?.url?.slice(request.url?.indexOf('?')));

		const brandQuery = searchParams?.get('brandId');
		const categoryQuery = searchParams?.get('categoryId');
		const searchQuery = searchParams?.get('search');

		const products = await DB.Product.find({
			...(categoryQuery ? {
				categories: {
					$in: categoryQuery,
				}
			} : {}),
			...(brandQuery ? {
				brand: {
					$in: brandQuery,
				}
			} : {}),
			...(searchQuery ? {
				title: {
					$regex: searchQuery,
					$options: 'i'
				},
			} : {}),
		}) as Product[]
		console.log('products', products)
		if(products.length){
			const categories = await Promise.all(products?.map((product) => Promise.all(product.categories.map(item => DB.Category.findById(item)))));
			const attributes = await Promise.all(products?.map((product) => Promise.all(product.attributes.map(item => DB.Attribute.findById(item.attribute.value)))));
			const brands = await Promise.all(products?.map((product) => DB.Brand.findById(product.brand)));
			const productsFilled = Array.from(products).map((item, index) => {
				const productCategories = categories?.[index] ?? [];
				const brand = brands?.[index];
				return {...item._doc, categories: productCategories, brand, attributes: attributes[index]}
			})
			return NextResponse.json(productsFilled);
		}
		return NextResponse.json([]);
		// console.log(productsFilled)

	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}

}
