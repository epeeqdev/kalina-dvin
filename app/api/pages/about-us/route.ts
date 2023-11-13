import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {deleteImage, uploadImage} from "@/backend/imageAPI";
import {AboutUsDTO} from "@/backend/types";


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as AboutUsDTO;
        const existing = await DB.AboutUs.findOne() as AboutUsDTO;
        if (existing) {
            try {
                await deleteImage(existing.image?.id);
            } catch (err) {
                console.log(err);
            }
        }
        const image = await uploadImage(body.image);
        const aboutUs = {
            ...body,
            image
        }
        if (existing) {
            const saved = await DB.AboutUs.findByIdAndUpdate(
                existing._id,
                {
                    $set: aboutUs,
                }
            );
            return NextResponse.json(saved);
        }
        const saved = await new DB.AboutUs(aboutUs).save() as AboutUsDTO;
        return NextResponse.json(saved);
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}

const initialData:AboutUsDTO = {
    image: {
        src: "",
        id: "",
        extension: ""
    },
    homePageDescription: {
        ru: "",
        am: ""
    },
    aboutUsPageDescriptionTop: {
        ru: "",
        am: ""
    },
    aboutUsPageDescriptionBottom: {
        ru: "",
        am: ""
    },
    assortmentCount: 0,
    brandsCount: 0,
    partnersCount: 0
}
export async function GET() {
    try {
        const existing = await DB.AboutUs.findOne() as AboutUsDTO;
        if (existing) {
            return NextResponse.json(existing);
        } else {
            return NextResponse.json(initialData);
        }
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}

