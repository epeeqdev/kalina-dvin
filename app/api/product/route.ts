import {createFiles, verifyToken} from "@/app/api/helpers";
import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Product} from "@/app/admin/main/products/types";
import fs from "fs";
import path from "path";
import {Image} from "@/app/admin/types";



export async function POST(request: NextRequest) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const body = await request.json();
		await createFiles(body.images);
		const images = body.images?.map(({id, extension}:Image) => ({id, extension, src: `/uploads/${id}.${extension}`}))
		const savedProduct = new DB.Product({...body, images}).save() as Product;
		return NextResponse.json(savedProduct);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
