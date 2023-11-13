import {DB} from "@/backend/db";
import {NextRequest, NextResponse} from "next/server";
import {ContactsPageDTO} from "@/backend/types";


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as ContactsPageDTO;
        const existing = await DB.ContactsPage.findOne() as ContactsPageDTO;
        if (existing) {
            const saved = await DB.ContactsPage.findByIdAndUpdate(
                existing._id,
                {
                    $set: body,
                }
            );
            return NextResponse.json(saved);
        }
        const saved = await new DB.ContactsPage(body).save() as ContactsPageDTO;
        return NextResponse.json(saved);
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}

const initialData:ContactsPageDTO = {
    phone: "+37499999999",
    email: "kalina_dvin@gmail.com",
    address: {
        ru: "Ереван,ул. А. Агароняна 1/8",
        am: "Երեւան, Ա.Ահարոնյան 1/8"
    },
    socialLinks: {
        instagram: "https://instagram.com/dvinkalina?igshid=MW4xMHRzMjU0aHljNg==",
        facebook: "https://www.facebook.com/profile.php?id=100095384140736"
    }
}
export async function GET() {
    try {
        const existing = await DB.ContactsPage.findOne() as ContactsPageDTO;
        if (existing) {
            return NextResponse.json(existing);
        } else {
            return NextResponse.json(initialData);
        }
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: err.message}), {status: 500})
    }
}


