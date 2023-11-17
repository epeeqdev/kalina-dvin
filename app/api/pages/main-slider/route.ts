import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {handleImages} from "@/backend/imageAPI";
import {MainPageSliderDTO} from "@/backend/types";


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as MainPageSliderDTO;
        const existing = await DB.MainPageSlider.findOne() as MainPageSliderDTO;
        const images = await handleImages(existing?.slides?.map(slide => slide.image), body.slides?.map(slide => slide.image))
        const slider = {
            ...body,
            slides: body.slides.map((slide, index) => ({...slide, image: images?.[index]}))
        }
        if (existing) {
            const savedSlider = await DB.MainPageSlider.findByIdAndUpdate(
                existing._id,
                {
                    $set: slider,
                },
                {new: true}
            );
            return NextResponse.json(savedSlider);
        }
        const savedSlider = await new DB.MainPageSlider(slider).save() as MainPageSliderDTO;
        return NextResponse.json(savedSlider);
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}

export async function GET() {
    try {
        const existing = await DB.MainPageSlider.findOne() as MainPageSliderDTO;
        if (existing) {
            return NextResponse.json(existing);
        } else {
            return NextResponse.json({slides: []} as MainPageSliderDTO);
        }
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}


