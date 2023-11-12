import './style.css'
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {LanguageType} from "@/app/main/components/controls/dropdown";
import {Typography} from "@/app/main/components/controls/typography";
import {Button} from "@/app/main/components/controls/button";

const buttonTitle = {am: 'Տեսնել Ավելին', ru: 'Узнать больше'}

interface Props {
    title: LanguageType;
    description: LanguageType;
    link: string;
    img: string
}
type SliderItemProps = Props
export const SliderItem = ({title, link, description, img}:SliderItemProps) => {
    const { getLanguage } = useLanguage();
    const router = useRouter()

    const handleSeeMore = () => {
        router.push(link)
    }

    return(
        <>
            <div className='w-full h-full' >
                <Image src={img} alt='swiper' width={1920} height={752} className='w-full h-full object-cover'/>
            </div>
            <div className='absolute top-0 bottom-0 right-0 left-0 bg-primary bg-opacity-30 px-[5%] flex flex-col justify-center items-start'
            >
                <Typography
                    size='7xl'
                    color='secondary'
                    fontWeight={500}
                >{getLanguage(title)}</Typography>
                <Typography
                    color='white'
                    size='lg'
                    className='mb-4 lg:max-w-[50%]'
                >{getLanguage(description)}</Typography>
                <Button onClick={handleSeeMore}>
                    {getLanguage(buttonTitle)}
                </Button>
            </div>
        </>
    )
}