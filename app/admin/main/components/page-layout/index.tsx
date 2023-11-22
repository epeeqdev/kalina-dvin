import Header from "@/app/admin/main/components/header";
import {ReactNode} from "react";

interface Props extends React.PropsWithChildren{
    headerTitle: string;
    headerButtons: ReactNode;
}
export const PageLayout = ({headerButtons, headerTitle, children}:Props) => {
    return <div className='flex flex-col mb-[100px] h-[calc(100vh-40px)]'>
        <Header title={headerTitle}>
            {headerButtons}
        </Header>
        <div className='overflow-y-auto flex-1 pt-5 pb-[100px]'>
            {children}
        </div>
    </div>
}