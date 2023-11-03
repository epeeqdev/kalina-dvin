import {DB} from "@/backend/db";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
	try{
		const searchParams = new URLSearchParams(request.url?.slice(request.url?.indexOf('?')));

		const qNew = searchParams?.get('new');
		const qCategory = searchParams?.get('category');
		let products;

		if (qNew) {
			products = await DB.Product.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			products = await DB.Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			products = await DB.Product.find();
		}

		return NextResponse.json(products);
	}catch(err){
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}

}
