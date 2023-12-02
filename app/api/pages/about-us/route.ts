import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {AboutUsDTO} from "@/backend/types";


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as AboutUsDTO;
        const existing = await DB.AboutUs.findOne() as AboutUsDTO;
        const mainPageImage = body.mainPageImage._id;
        const aboutPageTopImage = body.aboutPageTopImage._id;
        const aboutPageBottomImage = body.aboutPageBottomImage._id;
        const aboutUs = {
            ...body,
            mainPageImage,
            aboutPageTopImage,
            aboutPageBottomImage
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
    mainPageImage: null,
    aboutPageTopImage: null,
    aboutPageBottomImage: null,
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
        const existing = await DB.AboutUs.findOne().populate('mainPageImage').populate('aboutPageTopImage').populate('aboutPageBottomImage') as AboutUsDTO;
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


