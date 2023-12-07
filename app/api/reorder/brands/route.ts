import {NextRequest, NextResponse} from "next/server";
import {DB} from "@/backend/db";

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as {order: string[]};
        const existing = await DB.BrandsOrder.findOne() ;
        if (existing) {
            const updated = await DB.BrandsOrder.findByIdAndUpdate(
                existing._id,
                {
                    $set: body,
                },
                { new: true }
            );
            return NextResponse.json(updated);
        }
        const updated = await new DB.BrandsOrder(body).save();
        return NextResponse.json(updated);
    } catch (err: any) {
        console.log(err)
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}