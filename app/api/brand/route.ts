import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Brand} from "@/app/admin/main/products/types";



export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const image = body.image?._id;
		const savedBrand = await new DB.Brand({...body, image}).save() as Brand;
		return NextResponse.json(savedBrand);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
