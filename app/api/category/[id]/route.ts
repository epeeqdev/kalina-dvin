import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {Brand} from "@/app/admin/main/products/types";
import {deleteImage} from "@/backend/imageAPI";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: Params) {
	try {
		const category = await DB.Category.findById(context.params.id).populate('image');
		return NextResponse.json(category);
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function PUT(request: NextRequest, context: Params) {
	try {
		const body = await request.json();
		const image = body.image._id;

		const updatedCategory = await DB.Category.findByIdAndUpdate(
			context.params.id,
			{
				$set: {...body, image},
			},
			{ new: true }
		);
		return NextResponse.json(updatedCategory);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}

export async function DELETE(request: NextRequest, context: Params) {
	try {
		const oldCategory = await DB.Category.findById(context.params.id) as Brand;
		if(oldCategory){
			await deleteImage(oldCategory.image.id);
		}
		await DB.Category.findByIdAndDelete(context.params.id);
		return NextResponse.json(JSON.stringify({success: true}));
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
