import { DB } from "@/backend/db";
import { NextRequest, NextResponse } from "next/server";
import { handleUnauthorized } from "@/app/api/helpers";
import { JWTUserEncoded } from "@/app/api/types";
import { jwtVerify } from 'jose';

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get("Authorization")?.split(" ")[1];
        let userData: JWTUserEncoded;
        try {
            const { payload } = await jwtVerify(token!, new TextEncoder().encode(process.env.JWT_SEC!));
            userData = payload as unknown as JWTUserEncoded;
        } catch (error) {
            return handleUnauthorized();
        }

        const user = await DB.User.find({ _id: userData.id });
        if (user) {
            return NextResponse.json({ authorized: true, user: user?.[0] || null }, { status: 200 });
        }
        return handleUnauthorized();
    } catch (err) {
        return new NextResponse(JSON.stringify({ message: "Something went wrong on our side." }), { status: 500 });
    }
}
