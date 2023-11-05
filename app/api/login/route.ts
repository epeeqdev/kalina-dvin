import {DB} from "@/backend/db";
import CryptoJS from "crypto-js"
import jwt from 'jsonwebtoken'
import {NextResponse} from "next/server";

export async function POST(request: Request,) {
	try{
		const requestBody = await request.json();
		console.log('request username', requestBody.username)
		const user = await DB.User.findOne(
			{
				username: requestBody.username
			}
		);

		console.log('useeer ',user)

		if(!user){
			return new NextResponse("Wrong User Name", {status: 401})
		}

		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC
		);


		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

		const inputPassword = requestBody.password;
		if(originalPassword != inputPassword) {
			return new NextResponse(`Wrong Password: pass_sec: ${process.env.PASS_SEC}, real_pass: ${originalPassword}, inputPass: ${inputPassword}`, {status: 401})
		}

		const accessToken = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_SEC,
			{expiresIn:"3d"}
		);

		const { password, ...others } = user._doc;
		return NextResponse.json({...others, accessToken});

	}catch(err){
		return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
	}
}


