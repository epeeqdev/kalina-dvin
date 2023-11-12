import {ColorProps, TextLeadingProps, WeightProps} from "@/app/main/components/controls/typography/types";
import {getColorClass, getFontWeightClass, getLeadingClass} from "@/app/main/components/controls/typography/helpers";
import clsx from "clsx";

const sizes = {
    '7xl': "lg:text-7xl md:text-6xl sm:text-5xl text-3xl",
    '6xl': "lg:text-6xl md:text-5xl sm:text-4xl text-2xl",
    '5xl': "lg:text-5xl md:text-4xl sm:text-3xl text-xl",
    '4xl': "lg:text-4xl md:text-3xl sm:text-2xl text-lg",
    '3xl': "lg:text-3xl md:text-2xl text-xl",
    '2xl': "lg:text-2xl md:text-xl text-lg",
    xl: "lg:text-xl md:text-lg text-base",
    lg: "lg:text-lg md:text-md text-sm",
    md:'lg:text-md text-sm',
    sm: "lg:text-sm text-xs",
};

interface Props {
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p';
    size?: keyof typeof sizes;
    color?: ColorProps;
    leading?: TextLeadingProps;
    fontWeight?: WeightProps;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const Typography = ({ size='md', children, className, as='p', fontWeight=400, color='primary', leading, onClick }: Props) => {
    const sizeClasses = sizes[size];
    const Tag = as;

    return <Tag
        className={clsx([
            className,
            sizeClasses,
            getFontWeightClass(fontWeight),
            getColorClass(color),
            leading && getLeadingClass(leading),
        ])}
        onClick={onClick}
    >
        {children}
    </Tag>
};
