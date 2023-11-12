import {ColorProps, TextLeadingProps, WeightProps} from "@/app/main/components/controls/typography/types";
import {getColorClass, getFontWeightClass, getLeadingClass} from "@/app/main/components/controls/typography/helpers";
import clsx from "clsx";

const sizes = {
    '7xl': "lg:text-7xl md:text-6xl sm:text-5xl text-[32px]",
    '6xl': "lg:text-6xl md:text-5xl sm:text-4xl text-[30px]",
    '5xl': "lg:text-5xl md:text-4xl sm:text-[32px] text-[28px]",
    '4xl': "lg:text-4xl text-[24px]",
    '3xl': "lg:text-3xl text-[22px]",
    '2xl': "lg:text-2xl text-xl",
    xl: "lg:text-xl text-lg",
    lg: "lg:text-lg text-base",
    md:'lg:text-base text-sm',
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
