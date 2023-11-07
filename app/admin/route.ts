import {NextRequest, NextResponse} from "next/server";

export function GET(request: NextRequest){
	if(request.cookies.get('accessToken' as any)?.value){
		return NextResponse.redirect(`${request?.url}/main`)
	}
	return NextResponse.redirect(`${request?.url}/login`);
}
