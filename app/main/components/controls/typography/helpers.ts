import type {
    TextLeadingProps,
    WeightProps,
    ColorProps
} from './types';

export const getFontWeightClass = (weight: WeightProps) => {
    const fontWeights = {
        100: 'font-thin',
        200: 'font-extralight',
        300: 'font-light',
        400: 'font-normal',
        500: 'font-medium',
        600: 'font-semibold',
        700: 'font-bold',
        800: 'font-extrabold',
        900: 'font-black',
        inherit: 'font-inherit',
    };

    return fontWeights[weight];
};

export const getColorClass = (color: ColorProps) => {
    const colors = {
        white: 'text-white',
        gray: 'text-gray',
        primary: 'text-primary',
        secondary: 'text-secondary',
        currentColor: 'currentColor',
    } satisfies Record<ColorProps & 'currentColor', string>;

    return colors[color];
};

export const getLeadingClass = (value: TextLeadingProps) => {
    const leading = {
        clean: '',
        none: 'leading-none md:leading-none lg:leading-none',
        tight: 'leading-tight md:leading-tight lg:leading-tight',
        snug: 'leading-snug md:leading-snug lg:leading-snug',
        normal: 'leading-normal md:leading-normal lg:leading-normal',
        relaxed: 'leading-relaxed md:leading-relaxed lg:leading-relaxed',
        loose: 'leading-loose md:leading-loose lg:leading-loose',
        large: 'leading-[90px] md:leading-[110px]',
    };

    return leading[value];
};