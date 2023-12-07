import {DB} from "@/backend/db";
import {NextResponse} from "next/server";
import {reorderObjectsById} from "@/app/api/helpers";

export const dynamic = "force-dynamic";

export async function GET() {
	try{
		const brands = await DB.Brand.find().populate('image');
		const brandsOrder = await DB.BrandsOrder.findOne() as { order: string[] };
		if(brandsOrder){
			const reordered = reorderObjectsById(brandsOrder.order, brands);
			if(reordered.length){
				return NextResponse.json(reordered);
			}
		}
		return NextResponse.json(brands);
	}catch(err){
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
