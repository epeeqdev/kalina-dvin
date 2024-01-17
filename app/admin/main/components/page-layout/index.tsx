import Header from "@/app/admin/main/components/header";
import {ReactNode} from "react";

interface Props extends React.PropsWithChildren{
    headerTitle?: {am: string, ru: string};
    headerButtons?: ReactNode;
    withSearch?: boolean
    shownInMainPage?: boolean
}
export const PageLayout = ({headerButtons, headerTitle, children, withSearch, shownInMainPage = false}:Props) => {
    return <div className='flex flex-col mb-[100px] h-[calc(100vh-40px)]'>
        {!shownInMainPage && <Header withSearch={withSearch} title={headerTitle}>
            {headerButtons}
        </Header>}
        <div className='overflow-y-auto flex-1 pt-5 pb-[100px]'>
            {children}
        </div>
    </div>
}