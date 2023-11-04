import {DB} from "@/backend/db";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	try{
		const brands = await DB.Brand.find();
		return NextResponse.json(brands);
	}catch(err){
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
