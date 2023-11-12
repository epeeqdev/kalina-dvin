import clsx from 'clsx';

import {type IconNameOptions, icons} from './icons';

type SizesProps = 'sm' | 'md' | 'lg';

type ColorProps = 'primary' | 'secondary' | 'white' | 'gray';

export interface Props {
    name: IconNameOptions;
    size?: SizesProps;
    color?: ColorProps;
    className?: string;
    onClick?: () => void;
}

type TextProps = Props;

const getIconSize = (size: SizesProps) => {
    switch (size) {
        case'sm':
            return 16;
        case'md':
            return 24;
        case 'lg':
            return 32;
        default:
            return 24;
    }
};

const getColorClass = (color: ColorProps) => {
    switch (color) {
        case "primary": {
            return 'text-primary';
        }
        case "secondary": {
            return 'text-secondary';
        }
        case "gray": {
            return 'text-gray';
        }
        case "white": {
            return 'text-white';
        }
        default: {
            return 'text-primary';
        }
    }
}

export default function IconComponent({
                                          size = 'md',
                                          color = 'primary',
                                          name,
                                          className,
                                          onClick,
                                      }: TextProps) {
    const iconSize = getIconSize(size);

    return (
        <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx([
                className,
                getColorClass(color),
            ])}
            onClick={onClick}
            aria-hidden="true"
        >
            {icons[name]}
        </svg>
    );
}
