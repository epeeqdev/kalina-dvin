import * as jose from 'jose';
import { NextRequest, NextResponse } from "next/server";

export const verifyToken = async (req: NextRequest) => {
	console.log('req headers', req.headers);
	const authHeader = req.headers.get("Authorization");
	console.log('authHeader', authHeader);
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		try {
			// Here we await the verification of the token
			await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SEC!));
			// If verification is successful, we continue
			return null;
		} catch (err) {
			// If verification fails, we return an unauthorized response
			return handleUnauthorized();
		}
	} else {
		// If there's no Authorization header, we handle as unauthorized
		return handleUnauthorized();
	}
};

export const handleUnauthorized = () => {
	return new NextResponse(JSON.stringify({ error: "Unauthorized access." }), { status: 401 });
};