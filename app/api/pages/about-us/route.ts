import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {handleImage} from "@/backend/imageAPI";
import {AboutUsDTO, ImageDTO} from "@/backend/types";


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as AboutUsDTO;
        const existing = await DB.AboutUs.findOne() as AboutUsDTO;
        let image = existing?.image;
        try{
            image = await handleImage(existing?.image, body.image) as ImageDTO;
        }catch (e){
            console.log(e)
        }
        const aboutUs = {
            ...body,
            image
        }
        if (existing) {
            const updated = await DB.AboutUs.findByIdAndUpdate(
                existing._id,
                {
                    $set: aboutUs,
                },
                { new: true }
            );
            return NextResponse.json(updated);
        }
        const updated = await new DB.AboutUs(aboutUs).save();
        return NextResponse.json(updated);
    } catch (err: any) {
        console.log(err)
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
        console.log(err)
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}


