import {DB} from "@/backend/db";
import {NextResponse} from "next/server";
import {reorderObjectsById} from "@/app/api/helpers";

export const dynamic = "force-dynamic";

export async function GET() {
	try{
		const categories = await DB.Category.find().populate('image');
		const brandsOrder = await DB.CategoriesOrder.findOne() as { order: string[] };
		if(brandsOrder){
			const reordered = reorderObjectsById(brandsOrder.order, categories);
			if(reordered.length){
				return NextResponse.json(reordered);
			}
		}
		return NextResponse.json(categories);

	}catch(err){
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
