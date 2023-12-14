import React, { useState, useEffect } from 'react';
import clsx from "clsx";

type ImageProps = {
    src: string;
    alt?: string;
    className?: string;
    placeholderWithoutBorder?: boolean
};

export const CustomImage: React.FC<ImageProps> = ({ src, alt, className, placeholderWithoutBorder }) => {
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setImageSrc(src);
        img.onerror = () => setError(true);
    }, [src]);

    if (error) {
        return <div className={clsx('flex justify-center items-center', !placeholderWithoutBorder && 'border',className)}>
            <img className={clsx('max-h-[100%]')} src='/no-image-placeholder.png' alt={alt || 'placeholder'} />
        </div>;
    }
    if(src){
        return <img className={className} src={imageSrc} alt={alt} loading="lazy" />;
    }
    return null;

};
