import React from "react";
import ReactLoading from "react-loading";
import clsx from "clsx";

export interface ProportionBlockProps extends React.HTMLProps<HTMLDivElement>, React.PropsWithChildren {
    proportionalBlockStyle?: {
        paddingTop: string;
    },
    isLoading?: boolean;
    id?: string;
}

export const ProportionBlock = ({children, proportionalBlockStyle, isLoading, id,className, ...props}: ProportionBlockProps) => {
    return <div {...props} className={clsx('w-full relative flex justify-center items-center border border-gray text-xl', className)}
                style={proportionalBlockStyle}>
        <div className='absolute left-0 top-0 w-full h-full'>{children}</div>
        {isLoading && <div
            className='bg-white w-full h-full flex justify-center items-center absolute top-0 left-0 z-10'>
            <ReactLoading type="bars" color="red"/></div>}
    </div>
}