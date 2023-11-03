import {createFiles, verifyToken} from "@/app/api/helpers";
import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Brand} from "@/app/admin/main/products/types";
import path from "path";



export async function POST(request: NextRequest) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const body = await request.json();
		await createFiles([body.image]);
		const image = {...body.image, src: `/uploads/${body.image?.id}.${body.image?.extension}`}
		console.log('image', {...body, image})
		const savedCategory = await new DB.Category({...body, image}).save() as Brand;
		console.log('saved category', savedCategory)
		return NextResponse.json(savedCategory);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
