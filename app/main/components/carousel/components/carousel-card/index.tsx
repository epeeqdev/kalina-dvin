import clsx from "clsx";

interface Props {
    src: string,
    className?: string
}
export const CarouselCard = ({src, className}: Props) => {
    return (
        <img src={src} alt={src} className={clsx('h-full w-full object-contain', className)}/>
    )
}