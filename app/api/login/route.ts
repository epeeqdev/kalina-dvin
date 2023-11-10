import { DB } from "@/backend/db";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";
import { SignJWT } from 'jose';

export async function POST(request: Request) {
	try {
		const requestBody = await request.json();
		const user = await DB.User.findOne({
			username: requestBody.username
		});

		if (!user) {
			return new NextResponse("Wrong User Name", { status: 401 });
		}

		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC!
		);
		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

		if (originalPassword !== requestBody.password) {
			return new NextResponse(`Wrong Password`, { status: 401 });
		}

		// Create JWT using jose
		const accessToken = await new SignJWT({ id: user._id })
			.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
			.setExpirationTime('3d')
			.sign(new TextEncoder().encode(process.env.JWT_SEC));

		const { password, ...others } = user._doc;
		return NextResponse.json({ ...others, accessToken });
	} catch (err) {
		return new NextResponse(JSON.stringify({ message: "Something went wrong on our side." }), { status: 500 });
	}
}
