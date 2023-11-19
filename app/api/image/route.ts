import {NextRequest, NextResponse} from "next/server";
import {uploadFileImages} from "@/backend/imageAPI";
import {DB} from "@/backend/db";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const imageFiles = formData.getAll("images") as File[];
        if (!imageFiles || imageFiles.length === 0) {
            return NextResponse.json(
                {error: "Images are required."},
                {status: 400}
            );
        }
        console.time('Array buffer')
        const buffers = await Promise.all(imageFiles.map(file => fileToArrayBuffer(file)));
        console.timeEnd('Array buffer')
        console.time('Upload images')
        const uploaded = await uploadFileImages(buffers);
        console.timeEnd('Upload images')
        const uploadedImages = []
        console.time('Save images schemas')
        if (uploaded?.length) {
            for (let i = 0; i < uploaded.length; i++) {
                const newImage = await new DB.Image(uploaded[i]).save();
                uploadedImages.push(newImage);
            }
        }
        console.timeEnd('Save images schemas')
        return NextResponse.json({uploadedImages});
    } catch (e: any) {
        console.log(e);
        return new NextResponse(JSON.stringify({message: e.message}), {status: 500})
    }

}

async function fileToArrayBuffer(file: any) {
    const reader = file.stream().getReader();
    let chunks = [];
    let done, value;
    while (({done, value} = await reader.read()) && !done) {
        chunks.push(value);
    }
    return Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));
}
