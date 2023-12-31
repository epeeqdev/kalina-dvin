import {DB} from "@/backend/db";
import CryptoJS from "crypto-js"
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	try{
		const hashedPassword = CryptoJS.AES.encrypt(
			'iok3BI4J22uf4SF',
			process.env.PASS_SEC!
		);
		console.log('hashedPassword',hashedPassword)
		await new DB.User(
			{
				username: 'kalina-admin',
				password: hashedPassword
			}
		).save()

		return NextResponse.json({});

	}catch(err){
		console.log(err,'err')
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}


