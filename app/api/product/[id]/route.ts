import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {createFiles, removeFiles, verifyToken} from "@/app/api/helpers";
import path from "path";
import {Product} from "@/app/admin/main/products/types";
import {Image} from "@/app/admin/types";

export async function GET(request: NextRequest, context: Params) {
	try {
		const product = await DB.Product.findById(context.params.id);
		return NextResponse.json(product);
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function PUT(request: NextRequest, context: Params) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const body = await request.json();
		const folderPath = path.resolve(`${__dirname}/../../../../../../public/uploads`);

		const oldProduct = await DB.Product.findById(context.params.id) as Product;
		if(oldProduct.images?.length){
			const imageNames = oldProduct.images.map(image => `${image.id}.${image.extension}`);
			await removeFiles(imageNames);
		}

		await createFiles(body.images);
		const images = body.images?.map(({id, extension}:Image) => ({id, extension, src: `/uploads/${id}.${extension}`}));
		const updatedProduct = await DB.Product.findByIdAndUpdate(
			context.params.id,
			{
				$set: {...body, images},
			},
			{ new: true }
		);
		return NextResponse.json(updatedProduct);
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function DELETE(request: NextRequest, context: Params) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}

		const folderPath = path.resolve(`${__dirname}/../../../../../../public/uploads`);
		const oldItem = await DB.Product.findById(context.params.id) as Product;
		if(oldItem.images?.length){
			const imageNames = oldItem.images.map(image => `${image.id}.${image.extension}`);
			await removeFiles(imageNames);
		}
		await DB.Product.findByIdAndDelete(context.params.id);
		return NextResponse.json(JSON.stringify({success: true}));
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
