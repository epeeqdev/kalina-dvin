import {Button} from "@/app/admin/main/components/controls/button";
import {useRouter} from "next/navigation";
import {ReactNode} from "react";
import {BUTTON_GO_TO} from "../costants";
import {useLanguage} from "../../../main/hooks/useLanguage";


type Prop = {
    children: ReactNode
    title: {am: string, ru: string}
    path?: string
}
export default function MainPageSectionComponent({children, title, path} : Prop){
    const router = useRouter()
    const { getLanguage } = useLanguage();

    return (
        <div className="my-10">
            <span className="text-2xl flex my-10 mx-5 capitalize">{getLanguage(title)}</span>
            <div className="pl-5 pr-5 grid lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-2">
                {children}
            </div>
            <div className="flex justify-end my-10 mx-5">
                <Button variant="primary" onClick={() => router.push(`main/${path}`)}>{getLanguage(BUTTON_GO_TO)}</Button>
            </div>
            <div className='w-full flex justify-center '>
                <div className='border border-b-grey-400 w-full mx-5'/>
            </div>
        </div>
    )
}