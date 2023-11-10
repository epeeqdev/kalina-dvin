import { NextResponse, type NextRequest } from "next/server";
import {verifyToken} from "@/app/api/helpers";
import {APIMethods, PROTECTED_ROUTES} from "@/app/api/constants";

export default async function middleware(request: NextRequest) {
    const url = request.url.replace(new URL(request.url).origin, "");
    const protectedUrl = Object.keys(PROTECTED_ROUTES).find(key => url.includes(key));
    if(protectedUrl && PROTECTED_ROUTES[protectedUrl]?.includes(request.method as APIMethods) ) {
        const notVerified = await verifyToken(request);
        if(notVerified){
            return notVerified
        }
    }
    request.headers.append("x-url", request.url);
    return NextResponse.next({
        request,
    });
}