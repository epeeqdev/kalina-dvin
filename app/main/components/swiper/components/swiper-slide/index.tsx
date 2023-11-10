import './style.css'
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {LanguageType} from "@/app/main/components/controls/dropdown";
import {Typography} from "@/app/main/components/controls/typography";
import {Button} from "@/app/main/components/controls/button";

const buttonTitle = {arm: 'Տեսնել Ավելին', ru: 'Узнать больше'}

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
                <Image src={img} alt='swiper' width={1919} height={752} className='w-full h-full object-cover'/>
            </div>
            <div className='absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-end h-full
                pl-[11.7%] pr-[9.5%] pb-[29px] lg:pb-[91px]
                gap-y-[15px] sm:gap-y-[0] md:50px lg:gap-y-[124px] xl:gap-y-[124px] 2xl:gap-y-[124px]'
            >
                <div className='flex flex-col w-[100px] gap-y-[16px] sm:w-[180px] md:w-[200px] lg:w-[300px] xl:w-[340px] 2xl:w-[377px]'>
                    <Typography
                        title={getLanguage(title)}
                        fontSize='text-xl'
                        color='text-primary'
                        fontWeight='font-medium'
                        className='sm:text-3xl md:4xl lg:text-5xl xl:text-7xl 2xl:text-7xl'
                    />
                    <Typography
                        title={getLanguage(description)}
                        color='text-white'
                        fontWeight='font-bold'
                        fontSize='text-medium'
                        className='sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-2xl'
                    />
                </div>
                <div className='flex justify-end'>
                    <Button onClick={handleSeeMore}>
                        <Typography title={getLanguage(buttonTitle)} color='text-inherit' fontSize='text-inherit' fontWeight='font-semibold'/>
                    </Button>
                </div>

            </div>
        </>
    )
}