import './style.css'
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {useRouter} from "next/navigation";
import {Typography} from "@/app/main/components/controls/typography";
import {Button} from "@/app/main/components/controls/button";
import {SlideDTO} from "@/backend/types";

interface Props {
    data: SlideDTO
}
export const Slide = ({data}: Props) => {
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
            <div className='w-full h-full'>
                <img src={image?.src} alt='Main page slide image' className='w-full h-full object-cover'/>
            </div>
            <div
                className='absolute top-0 bottom-0 right-0 left-0 bg-primary bg-opacity-40 flex flex-col justify-center items-start'
            >
                <div className='w-full h-full sm:leading-md backdrop-blur-xs sm:h-auto px-[5%] py-4 sm:pr-[35%]' style={{textWrap:'balance'}}>
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