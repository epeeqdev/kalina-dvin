import {verifyToken} from "@/app/api/helpers";
import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Brand} from "@/app/admin/main/products/types";
import {uploadImage} from "@/backend/imageAPI";



export async function POST(request: NextRequest) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const body = await request.json();
		const image = await uploadImage(body.image);
		const savedCategory = await new DB.Category({...body, image}).save() as Brand;
		return NextResponse.json(savedCategory);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
