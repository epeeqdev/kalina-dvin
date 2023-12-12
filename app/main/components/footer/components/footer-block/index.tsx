import {Typography} from "@/app/main/components/controls/typography";

interface Props {
    title: string;
    children:React.ReactNode
}


export const FooterBlock = ({title, children}: Props) => {
    return(
        <div className='grid grid-row gap-y-2 lg:gap-y-4'>
            <Typography color='white' size='md' fontWeight={600}>{title}</Typography>
            <div className='flex flex-col gap-y-1 lg:gap-x-3'>
                {children}
            </div>
        </div>
    )
}