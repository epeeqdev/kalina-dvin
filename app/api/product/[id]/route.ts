import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {Product} from "@/app/admin/main/products/types";
import {deleteImages, uploadImages} from "@/backend/imageAPI";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: Params) {
	try {
		const product = await DB.Product.findById(context.params.id).populate('categories')
			.populate('brand').populate('attributes.attribute') as Product;
		return NextResponse.json(product);
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function PUT(request: NextRequest, context: Params) {
	try {
		const body = await request.json();
		const oldProduct = await DB.Product.findById(context.params.id) as Product;
		if(oldProduct?.images?.length){
			await deleteImages(oldProduct.images);
		}
		let images;
		if(body?.images?.length){
			images = await uploadImages(body.images)
		}else {
			images = [];
		}

		body.images = images;

		const updatedProduct = await DB.Product.findByIdAndUpdate(
			context.params.id,
			{
				$set: body,
			}
		);
		return NextResponse.json(updatedProduct);
	} catch (err) {
		console.log('err', err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function DELETE(request: NextRequest, context: Params) {
	try {
		const oldItem = await DB.Product.findById(context.params.id) as Product;
		if(oldItem.images?.length){
			await deleteImages(oldItem.images);
		}
		await DB.Product.findByIdAndDelete(context.params.id);
		return NextResponse.json(JSON.stringify({success: true}));
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
