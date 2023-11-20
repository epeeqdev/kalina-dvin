'use client'

import {CategoryResponseDTO, ContactsPageDTO} from "@/backend/types";
import {LngProvider} from "@/app/main/lng-provaider";
import {Header} from "@/app/main/components/header";
import {Footer} from "@/app/main/components/footer";

interface Props extends React.PropsWithChildren {
    categories: CategoryResponseDTO[];
    contacts: ContactsPageDTO;
}
export const LayoutWrapper = ({children, categories, contacts}:Props) => {
    return <div className='flex flex-col min-h-screen'>
        <LngProvider>
            <Header contacts={contacts}/>
            <div className='flex-1'>
                {children}
            </div>
            <Footer categories={categories} contacts={contacts}/>
        </LngProvider>
    </div>
}