import {verifyToken} from "@/app/api/helpers";
import {db} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Product} from "@/app/admin/main/products/types";
import fs from "fs";
import path from "path";
import {Image} from "@/app/admin/types";
async function createFiles(files:Image[], folderPath: string) {

	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
	}
	for(let i = 0; i < files.length; i++){
		const file = files[i];
		const filePath = path.join(folderPath, `${file.id}.${file.extension}`);
		const base64Image = file.src.split(';base64,').pop()!;
		await fs.writeFile(filePath, base64Image, {encoding: 'base64'}, function(err) {
			console.log('File created',filePath);
		});
	}
}


export async function POST(request: NextRequest) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const body = await request.json();
		const folderPath = path.resolve(`${__dirname}/../../../../../public/uploads`);
		await createFiles(body.images,folderPath);
		const images = body.images?.map(({id, extension}:Image) => ({id, extension, src: `/uploads/${id}.${extension}`}))
		const savedProduct = new db.Product({...body, images}).save() as Product;
		return NextResponse.json(savedProduct);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
