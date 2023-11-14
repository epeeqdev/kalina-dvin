import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {deleteImage, handleImage, uploadImage} from "@/backend/imageAPI";
import {CategoriesPageDTO} from "@/backend/types";


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as CategoriesPageDTO;
        const existing = await DB.CategoriesPage.findOne() as CategoriesPageDTO;
        let image = existing?.image;
        try{
            image = await handleImage(existing?.image, body.image)
        }catch (e){
            console.log(e)
        }
        const pageData = {
            ...body,
            image
        }
        if (existing) {
            const saved = await DB.CategoriesPage.findByIdAndUpdate(
                existing._id,
                {
                    $set: pageData,
                }
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
    image: {
        src: "",
        id: "",
        extension: ""
    },
}
export async function GET() {
    try {
        const existing = await DB.CategoriesPage.findOne() as CategoriesPageDTO;
        if (existing) {
            return NextResponse.json(existing);
        } else {
            return NextResponse.json(initialData);
        }
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}


