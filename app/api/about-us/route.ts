import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";

export const dynamic = "force-dynamic";

export async function GET(_: NextRequest, context: Params) {
    try {
        const attribute = await DB.Attribute.findById(context.params.id);
        return NextResponse.json(attribute);
    } catch (err:any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: err.status})
    }
}

export async function PUT(request: NextRequest, context: Params) {
    try {
        const body = await request.json();
        const updatedAttribute = await DB.Attribute.findByIdAndUpdate(
            context.params.id,
            {
                $set: {...body},
            },
            { new: true }
        );
        return NextResponse.json(updatedAttribute);
    } catch (err:any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: err.status})
    }
}

export async function DELETE(request: NextRequest, context: Params) {
    try {
        await DB.Attribute.findByIdAndDelete(context.params.id);
        return NextResponse.json(JSON.stringify({success: true}));
    } catch (err) {
        return new NextResponse(JSON.stringify({message: "Something went wrong on our side."}), {status: 500})
    }
}
