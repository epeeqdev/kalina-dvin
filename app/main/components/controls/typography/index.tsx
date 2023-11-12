import {
    ColorProps,
    TextLeadingProps,
    TitleSizeProps,
    TitleTagProps, WeightProps
} from "@/app/main/components/controls/typography/types";
import clsx from "clsx";
import {getColorClass, getFontWeightClass, getLeadingClass} from "@/app/main/components/controls/typography/helpers";

interface Props {
    as?: TitleTagProps;
    size?: TitleSizeProps;
    color?: ColorProps;
    leading?: TextLeadingProps;
    fontWeight?: WeightProps;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    small?: boolean;
}

export const Typography = ({
                               as: Tag = 'h2',
                               size = 'lg',
                               color = 'primary',
                               leading = 'clean',
                               fontWeight = 400,
                               className,
                               onClick,
                               children,
                               small = false,
                           }: Props) => {
    return (
        <Tag
            className={clsx([
                className,
                {
                    'text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl': size === '8xl',
                    'text-7xl': size === '7xl',
                    'text-6xl': size === '6xl',
                    'text-5xl': size === '5xl',
                    'text-xl md:text-2xl xl:text-4xl': size === '4xl',
                    'text-3xl': size === '3xl',
                    'text-2xl': size === '2xl',
                    'text-xl': size === 'xl',
                    'text-lg': size === 'lg',
                    'text-base': size === 'base',
                    'text-sm': size === 'sm',
                    'text-xs': size === 'xs',
                },
                getFontWeightClass(fontWeight),
                getColorClass(color),
                leading && getLeadingClass(leading),
            ])}
            onClick={onClick}
        >
            {small ? <small>{children}</small> : children}
        </Tag>
    );
}
