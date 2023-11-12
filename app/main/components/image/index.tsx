import React, { useState, useEffect } from 'react';

type ImageProps = {
    src: string;
    alt?: string;
    placeholder?: string;
    className?: string;
};

export const CustomImage: React.FC<ImageProps> = ({ src, alt, className, placeholder }) => {
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setImageSrc(src);
        img.onerror = () => setError(true);
    }, [src]);

    if (error) {
        return <img className={className} src='/no-image-placeholder.png' alt={alt || 'placeholder'} />;
    }

    return <img className={className} src={imageSrc} alt={alt} loading="lazy" />;
};
