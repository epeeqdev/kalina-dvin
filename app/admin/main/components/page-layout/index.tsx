import Header from "@/app/admin/main/components/header";
import {ReactNode} from "react";

interface Props extends React.PropsWithChildren{
    headerTitle: string;
    headerButtons: ReactNode;
}
export const PageLayout = ({headerButtons, headerTitle, children}:Props) => {
    return <div className='flex flex-col h-screen'>
        <Header title={headerTitle}>
            {headerButtons}
        </Header>
        <div className='overflow-y-auto h-full flex-1 pt-10'>
            {children}
        </div>
    </div>
}