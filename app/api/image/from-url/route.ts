import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {uploadImage} from "@/backend/imageAPI";
import uniqid from "uniqid";



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const image = await uploadImage({id:uniqid(), src: body.image, extension: 'jpg'});
        console.log('uploaaded', image)
        const uploadedImage = await new DB.Image(image).save();
        return NextResponse.json({uploadedImage});
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
    }
}
