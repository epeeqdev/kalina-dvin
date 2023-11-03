import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {createFiles, removeFiles, verifyToken} from "@/app/api/helpers";
import path from "path";
import {Brand} from "@/app/admin/main/products/types";
import {Image} from "@/app/admin/types";

export async function GET(request: NextRequest, context: Params) {
	try {
		// const brand = await DB.Brand.findById(context.params.id);
		const folderPath = path.resolve('./public/uploads');
		return NextResponse.json({folder: folderPath, dirname: __dirname});
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

		const oldBrand = await DB.Brand.findById(context.params.id) as Brand;
		const oldImage = oldBrand.image;
		if(oldImage){
			await removeFiles([`${oldImage.id}.${oldImage.extension}`]);
		}

		await createFiles([body.image]);

		const image = body.image;
		const updatedBrand = await DB.Brand.findByIdAndUpdate(
			context.params.id,
			{
				$set: {...body, image: {...image, src: `/uploads/${image.id}.${image.extension}`}},
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
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const oldBrand = await DB.Brand.findById(context.params.id) as Brand;
		const oldImage = oldBrand.image;
		if(oldImage){
			const folderPath = path.resolve(`${__dirname}/../../../../../../public/uploads`);
			await removeFiles([`${oldImage.id}.${oldImage.extension}`]);
		}

		await DB.Brand.findByIdAndDelete(context.params.id);
		return NextResponse.json(JSON.stringify({success: true}));
	} catch (err) {
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
