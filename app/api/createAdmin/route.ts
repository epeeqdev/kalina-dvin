import {DB} from "@/backend/db";
import CryptoJS from "crypto-js"
import {NextResponse} from "next/server";

export async function GET(request: Request,) {
	try{
		const hashedPassword = await CryptoJS.AES.encrypt(
			'1234',
			process.env.PASS_SEC
		);
		console.log('hashedPassword',hashedPassword)
		const user = await new DB.User(
			{
				username: 'admin',
				password: hashedPassword
			}
		).save()

		// if(!user){
		// 	return new NextResponse("Wrong User Name", {status: 401})
		// }



		return NextResponse.json({});

	}catch(err){
		console.log(err,'err')
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}


