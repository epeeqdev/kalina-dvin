import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Product} from "@/app/admin/main/products/types";
import {uploadImages} from "@/backend/imageAPI";


export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		body.images = await uploadImages(body.images);
		const savedProduct = await new DB.Product(body).save() as Product;
		return NextResponse.json(savedProduct);
	} catch (err:any) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
	}
}
