import clsx from 'clsx';

type Color = 'text-primary' | 'text-secondary' | 'text-white' | 'text-inherit';
type FontSize = 'text-xs' | 'text-sm' | 'text-md' | 'text-lg' | 'text-xl' | 'text-base' | 'text-small' | 'text-medium' | 'text-7xl' | 'text-2xl' | 'text-inherit';
type FontWeight = 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold' | 'font-inherit';


interface Props {
    title: string,
    color?: Color,
    fontSize?: FontSize,
    fontWeight?: FontWeight,
    lineHeight?: string,
    className?: string
}
// {clsx([`text-${color}`, `text-${fontSize}`, `font-${fontWeight}`, `leading-${lineHeight}`, 'font-body', className,])}>
type TextPros = Props
export const Typography = ({color = 'text-secondary', fontSize = 'text-sm', fontWeight = 'font-normal', lineHeight, className, title}: TextPros) => {
    return(
        <span className={clsx([color,fontSize, fontWeight, lineHeight, 'font-body', className,])}>
            {title}
        </span>
    )
}