import { NextRequest, NextResponse } from "next/server";
import {deleteImage} from "@/backend/imageAPI";
import {DB} from "@/backend/db";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";

export async function DELETE(_: NextRequest, context: Params) {
    try {
        try{
            await deleteImage(context.params.id);
        }catch (e:any){
            console.log('Image delete error: ' + e.message);
        }

        await DB.Image.findByIdAndDelete(context.params.id);
        return NextResponse.json(JSON.stringify({success: true}));
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
    }
}
