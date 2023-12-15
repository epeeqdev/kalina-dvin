'use client'
import {Typography} from "@/app/main/components/controls/typography";
import {ImageDTO, TextStructure} from "@/backend/types";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {CustomImage} from "../../../components/image";

interface Props {
    imageData: ImageDTO;
    title: TextStructure;
}

export const PageHeaderBackground = ({imageData, title}:Props) => {
    const {getLanguage} = useLanguage()
    return <div className="w-full md:h-[30vh] md:min-h-[300px] xl:h-[30vw] h-[300px] relative flex items-center justify-center">
        <CustomImage src={imageData?.src} alt='products page background' className='absolute top-0 left-o w-full h-full object-cover'/>
        <div className='w-full h-full absolute top-0 left-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center'>
            <Typography color='white' size='4xl' as='h1' className='relative z-10'>{getLanguage(title)}</Typography>
        </div>
    </div>
}