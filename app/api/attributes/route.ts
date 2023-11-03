import {DB} from "@/backend/db";
import {NextResponse} from "next/server";

export async function GET() {
	try{
		const attributes = await DB.Attribute.find();
		return NextResponse.json(attributes);
	}catch(err){
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
