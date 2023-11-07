import {Header} from "@/app/main/components/header";
import {Footer} from "@/app/main/components/footer";
import {LngProvider} from "@/app/main/lng-provaider";

export default function MainLayout({children}:React.PropsWithChildren){

    return <div className='flex flex-col min-h-screen'>
        <LngProvider>
            <Header/>
            <div className='flex-1'>
            {children}
            </div>
            <Footer/>
        </LngProvider>
    </div>
}