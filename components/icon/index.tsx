import clsx from 'clsx';

type Color = 'primary' | 'secondary' | 'white' | 'inherit';

import {type IconNameOptions, icons} from './icons';

export interface Props {
  name: IconNameOptions;
  size?: {width: string | number, height: string | number };
  color?: Color;
  className?: string;
  onClick?: () => void;
}

type TextProps = Props;

export default function IconComponent({
  size = {width: 24 , height: 24},
  color = 'primary',
  name,
  className,
  onClick,
}: TextProps) {

  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx([
        `icon-${name}`,
        `text-${color}`,
        className,
      ])}
      onClick={onClick}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
