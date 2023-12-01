import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {Product} from "@/app/admin/main/products/types";
import {deleteImages, handleImages} from "@/backend/imageAPI";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: Params) {
	try {
		const allProducts = await DB.Product.find().populate('categories')
			.populate('brand').populate('images').populate('attributes.attribute');
		const currentProduct = allProducts?.find(p => p._id?.toString() === context.params.id);
		const currentProductCategories = currentProduct?.categories?.reduce((acc, item) => {
			acc[item._id?.toString()] = true;
			return acc
		}, {});
		const relatedProducts = allProducts.filter(p => p._id?.toString() !== context.params.id)
			.filter(item => item.categories.some(cat => {
				console.log(cat)
				return currentProductCategories[cat._id?.toString()]
			})).slice(0, 5)

		return NextResponse.json({...currentProduct._doc, relatedProducts});
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function PUT(request: NextRequest, context: Params) {
	try {
		const body = await request.json();
		body.images = handleImages(body.images)

		const updatedProduct = await DB.Product.findByIdAndUpdate(
			context.params.id,
			{
				$set: body,
			},
			{new:true}
		)
		return NextResponse.json(updatedProduct);
	} catch (err) {
		console.log('err', err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function DELETE(_: NextRequest, context: Params) {
	try {
		const oldItem = await DB.Product.findById(context.params.id).populate('images') as Product;
		if(oldItem.images?.length){
			await deleteImages(oldItem.images?.map(image => image._id));
		}
		await DB.Product.findByIdAndDelete(context.params.id);
		return NextResponse.json(JSON.stringify({success: true}));
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
