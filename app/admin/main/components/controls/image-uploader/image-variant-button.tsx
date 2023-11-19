
import React from "react";

interface Props extends React.PropsWithChildren {
    as?: 'div' | 'label',
    onClick?: () => void
}
export const ImageVariantButton = ({as = 'div', onClick, children}:Props) => {
    const Component = as;
    return <Component
        onClick={onClick}
        className='flex items-center gap-2 flex-1 justify-center transition hover:bg-gray cursor-pointer'>
        {children}
    </Component>
}