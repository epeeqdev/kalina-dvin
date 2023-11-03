import {verifyToken} from "@/app/api/helpers";
import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";



export async function POST(request: NextRequest) {
	try {
		const notVerified = verifyToken(request);
		if(notVerified){
			return notVerified
		}
		const body = await request.json();
		const savedAttribute = new DB.Attribute({...body}).save();
		return NextResponse.json(savedAttribute);
	} catch (err) {
		console.log(err)
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}
