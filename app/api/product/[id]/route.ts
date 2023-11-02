import {db} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {verifyToken} from "@/app/api/helpers";

export async function GET(request: NextRequest, context: Params) {
	try {
		const product = await db.Product.findById(context.params.id);
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
		const updatedProduct = await db.Product.findByIdAndUpdate(
			context.params.id,
			{
				$set: body,
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
		await db.Product.findByIdAndDelete(context.params.id);
		return NextResponse.json(JSON.stringify({success: true}));
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
