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
		const folderPath = path.resolve(`${__dirname}/../../../../../public/uploads`);
		await createFiles([body.image],folderPath);
		const image = {...body.image, src: `/uploads/${body.image?.id}.${body.image?.extension}`}
		const savedBrand = await new DB.Brand({...body, image}).save() as Brand;
		return NextResponse.json(savedBrand);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
