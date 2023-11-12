import React from 'react';
import {Typography} from "@/app/main/components/controls/typography";

const TypographyShowcase = () => {
    const sizes = ['7xl', '6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm'];

    return (
        <div>
            {sizes.map(size => (
                    <Typography key={size} size={size} className="mb-4">
                This is size {size}
    </Typography>
))}
    </div>
);
};

export default TypographyShowcase;
