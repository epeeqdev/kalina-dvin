import {DB} from "@/backend/db";
import {NextResponse} from "next/server";
import {Product} from "@/app/admin/main/products/types";


export async function GET(request: Request) {
	try {
		const searchParams = new URLSearchParams(request?.url?.slice(request.url?.indexOf('?')));

		const brandQuery = searchParams?.get('brand');
		const categoryQuery = searchParams?.get('category');
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
		}).populate('categories').populate('brand').populate('attributes.attribute') as Product[]

		return NextResponse.json(products);

	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}

}
