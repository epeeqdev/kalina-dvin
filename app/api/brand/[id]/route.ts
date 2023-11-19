import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {Brand} from "@/app/admin/main/products/types";
import {deleteImage} from "@/backend/imageAPI";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: Params) {
	try {
		const brand = await DB.Brand.findById(context.params.id).populate('image');
		return NextResponse.json(brand);
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function PUT(request: NextRequest, context: Params) {
	try {
		const body = await request.json();
		const image = body.image?._id;
		const updatedBrand = await DB.Brand.findByIdAndUpdate(
			context.params.id,
			{
				$set: {...body, image},
			},
			{ new: true }
		).populate('image');
		return NextResponse.json(updatedBrand);
	} catch (err:any) {
		return new NextResponse(JSON.stringify({message: err?.message}), {status: 500})
	}
}

export async function DELETE(request: NextRequest, context: Params) {
	try {
		const oldBrand = await DB.Brand.findById(context.params.id).populate('image') as Brand;
		if(oldBrand){
			await deleteImage(oldBrand.image?._id);
		}

		await DB.Brand.findByIdAndDelete(context.params.id);
		return NextResponse.json(JSON.stringify({success: true}));
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
