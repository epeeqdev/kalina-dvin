import {useState} from "react";
import {Typography} from "@/app/main/components/controls/typography";
import IconComponent from "@/components/icon";
import clsx from "clsx";

interface AccordionProps extends React.PropsWithChildren{
    title: string;
    isDefaultOpen?: boolean;
}
export const Accordion = ({title, isDefaultOpen, children}: AccordionProps) => {
    const [isOpen, setOpen] = useState(isDefaultOpen);

    return <div>
        <div className={clsx('flex justify-between cursor-pointer items-center transition px-4 py-2', {
            'bg-white hover:bg-gray': !isOpen,
            'bg-primary text-white hover:bg-primary-darker': isOpen
        })} onClick={() => setOpen(v=> !v)}>
            <Typography color='inherit' size='lg'>
                {title}
            </Typography>
            <IconComponent name={isOpen ? 'minus' : 'plus'} size='lg'/>
        </div>
        <div className={clsx('w-full transition-[height]', {
            'h-0 overflow-hidden pointer-none': !isOpen,
            'h-auto min-h-[100px] pointer-all': isOpen
        })}>
            {children}
        </div>
    </div>
}