import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {ProductsPageDTO} from "@/backend/types";


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as ProductsPageDTO;
        const existing = await DB.ProductsPage.findOne() as ProductsPageDTO;
        const image = body.image._id;
        const pageData = {
            ...body,
            image
        }
        if (existing) {
            const saved = await DB.ProductsPage.findByIdAndUpdate(
                existing._id,
                {
                    $set: pageData,
                },
                {new:true}
            );
            return NextResponse.json(saved);
        }
        const saved = await new DB.ProductsPage(pageData).save() as ProductsPageDTO;
        return NextResponse.json(saved);
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}

const initialData:ProductsPageDTO = {
    image: null,
}
export async function GET() {
    try {
        const existing = await DB.ProductsPage.findOne().populate('image') as ProductsPageDTO;
        if (existing) {
            return NextResponse.json(existing);
        } else {
            return NextResponse.json(initialData);
        }
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}


