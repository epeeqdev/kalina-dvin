import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {Brand} from "@/app/admin/main/products/types";
import {deleteImage, uploadImage} from "@/backend/imageAPI";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: Params) {
	try {
		const brand = await DB.Brand.findById(context.params.id);
		return NextResponse.json(brand);
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function PUT(request: NextRequest, context: Params) {
	try {
		const body = await request.json();

		const oldBrand = await DB.Brand.findById(context.params.id) as Brand;
		const oldImage = oldBrand.image;
		if(oldImage){
			await deleteImage(oldImage.id);
		}

		const image = await uploadImage(body.image);

		const updatedBrand = await DB.Brand.findByIdAndUpdate(
			context.params.id,
			{
				$set: {...body, image},
			},
			{ new: true }
		);
		return NextResponse.json(updatedBrand);
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function DELETE(request: NextRequest, context: Params) {
	try {
		const oldBrand = await DB.Brand.findById(context.params.id) as Brand;
		if(oldBrand){
			await deleteImage(oldBrand.image.id);
		}

		await DB.Brand.findByIdAndDelete(context.params.id);
		return NextResponse.json(JSON.stringify({success: true}));
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
