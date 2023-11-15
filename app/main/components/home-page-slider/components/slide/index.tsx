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
                <img src={image.src} alt='Main page slide image' className='w-full h-full object-cover'/>
            </div>
            <div
                className='absolute top-0 bottom-0 right-0 left-0 bg-primary bg-opacity-30 px-[5%] flex flex-col justify-center items-start'
            >
                <Typography
                    size='7xl'
                    color='secondary'
                    fontWeight={500}
                    className='mb-4'
                >{getLanguage(title)}</Typography>
                <Typography
                    color='white'
                    size='lg'
                    className='mb-4 lg:max-w-[50%]'
                >{getLanguage(description)}</Typography>
                {!!getLanguage(buttonText) && buttonLink && <Button onClick={handleSeeMore}>
                    {getLanguage(buttonText)}
                </Button>}
            </div>
        </>
    )
}