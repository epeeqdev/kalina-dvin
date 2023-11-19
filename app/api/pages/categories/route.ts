import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {CategoriesPageDTO} from "@/backend/types";


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as CategoriesPageDTO;
        const existing = await DB.CategoriesPage.findOne() as CategoriesPageDTO;
        const image = body.image._id;
        const pageData = {
            ...body,
            image
        }
        if (existing) {
            const saved = await DB.CategoriesPage.findByIdAndUpdate(
                existing._id,
                {
                    $set: pageData,
                },
                {new: true}
            );
            return NextResponse.json(saved);
        }
        const saved = await new DB.CategoriesPage(pageData).save() as CategoriesPageDTO;
        return NextResponse.json(saved);
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}

const initialData:CategoriesPageDTO = {
    image: null,
}
export async function GET() {
    try {
        const existing = await DB.CategoriesPage.findOne().populate('image') as CategoriesPageDTO;
        if (existing) {
            return NextResponse.json(existing);
        } else {
            return NextResponse.json(initialData);
        }
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}


