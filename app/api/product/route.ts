import {verifyToken} from "@/app/api/helpers";
import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Product} from "@/app/admin/main/products/types";
import {uploadImages} from "@/backend/imageAPI";




export async function POST(request: NextRequest) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const body = await request.json();
		const images = await uploadImages(body.images);
		const savedProduct = await new DB.Product({...body, images}).save() as Product;
		return NextResponse.json(savedProduct);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
