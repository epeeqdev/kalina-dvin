import './style.css'
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {useRouter} from "next/navigation";
import {Typography} from "@/app/main/components/controls/typography";
import {Button} from "@/app/main/components/controls/button";
import {SlideDTO} from "@/backend/types";
import clsx from "clsx";
import {CustomImage} from "../../../../../components/image";

interface Props {
    data: SlideDTO;
    className?: string;
    imageClassName?: string;
}
export const Slide = ({data, className, imageClassName}: Props) => {
    const {image, title, description, buttonLink, buttonText} = data;
    const {getLanguage} = useLanguage();
    const router = useRouter()

    const handleSeeMore = () => {
        if (buttonLink) {
            router.push(buttonLink)
        }
    }

    return (
        <>
            <div className={clsx('w-full h-full', className)}>
                <CustomImage src={image?.src} alt='Main page slide image' className={clsx('w-full h-full object-cover', imageClassName)}/>
            </div>
            <div
                className='absolute top-0 bottom-0 right-0 left-0 bg-primary bg-opacity-40 flex flex-col justify-center items-start'
            >
                <div className='w-full h-full sm:leading-md backdrop-blur-xs sm:h-auto px-[5%] py-4 sm:pr-[35%]' style={{textWrap:'balance'} as any}>
                    <Typography
                        size='5xl'
                        color='secondary'
                        fontWeight={500}
                        as='h2'
                        className='mb-1 sm:mb-4'
                    >{getLanguage(title)}</Typography>
                    <Typography
                        color='white'
                        size='lg'
                        as='p'
                        className='mb-2 sm:mb-6'
                    >{getLanguage(description)}</Typography>
                    {!!getLanguage(buttonText) && buttonLink && <Button onClick={handleSeeMore}>
                        {getLanguage(buttonText)}
                    </Button>}
                </div>
            </div>
        </>
    )
}