import {DB} from "@/backend/db";
import jwt from 'jsonwebtoken'
import {NextRequest, NextResponse} from "next/server";
import {handleUnauthorized, verifyToken} from "@/app/api/helpers";
import {JWTUserEncoded} from "@/app/api/types";

export async function POST(request: NextRequest) {
    try {
        const notVerified = verifyToken(request);
        const token = request.headers.get("Authorization")?.split(" ")[1] as string;
        if (notVerified) {
            return notVerified
        }
        const userData = jwt.decode(token) as JWTUserEncoded;
        const user = await DB.User.find({_id: userData?.id})
        if (user && userData) {
            return NextResponse.json({authorized: true, user: user?.[0] || null}, {status: 200} as any)
        }
        return handleUnauthorized(request)


    } catch (err:Error) {
        console.log(err)
        return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500} as any)
    }
}


