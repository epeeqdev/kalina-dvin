import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {verifyToken} from "@/app/api/helpers";
import {Product} from "@/app/admin/main/products/types";
import {deleteImages, uploadImages} from "@/backend/imageAPI";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: Params) {
	try {
		const product = await DB.Product.findById(context.params.id) as Product;
		const categories = await Promise.all(product.categories.map(item => DB.Category.findById(item)));
		const attributes = await Promise.all(product.attributes.map(item => DB.Attribute.findById(item.attribute?.value)));
		const brand = await DB.Brand.findById(product.brand)
		return NextResponse.json({...product._doc, attributes: product.attributes.map((item,index) => ({...item, attribute: attributes[index] })), categories, brand: brand});
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

		const updatedProduct = await DB.Product.findByIdAndUpdate(
			context.params.id,
			{
				$set: {...body, images},
			},
			{ new: true }
		);
		return NextResponse.json(updatedProduct);
	} catch (err) {
		console.log('err', err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function DELETE(request: NextRequest, context: Params) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const oldItem = await DB.Product.findById(context.params.id) as Product;
		console.log('oldItem.images',oldItem.images)
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
