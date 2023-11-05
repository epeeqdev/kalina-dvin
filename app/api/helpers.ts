import jwt from "jsonwebtoken";
import {NextRequest, NextResponse} from "next/server";

export const verifyToken = (req: NextRequest) => {
	const authHeader = req.headers.get("Authorization");
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SEC, (err) => {
			if (err) {
				return new NextResponse(JSON.stringify({error: "Token is invalid."}), {status: 401})
			}
			return null;
		});
	} else {
		return handleUnauthorized()
	}
};

export const handleUnauthorized = () => {
	return new NextResponse(JSON.stringify({error: "Token is invalid."}), {status: 401})
}
