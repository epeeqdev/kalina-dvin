import {Typography} from "@/app/main/components/controls/typography";
import {ImageDTO} from "@/backend/types";
import {CustomImage} from "../../../../components/image";

interface Props {
    aboutUsPageDescriptionBottom: string;
    aboutPageBottomImage: ImageDTO
}
export const DescriptionBottom = ({aboutUsPageDescriptionBottom, aboutPageBottomImage}: Props) => {
    return(
        <div className='grid grid-cols-12 gap-[6%] px-[7%] py-[7%]'>
            <div className='col-span-5 hidden sm:block'>
                <CustomImage src={aboutPageBottomImage?.src} alt={aboutPageBottomImage?.id} className='w-full select-none object-cover' placeholderWithoutBorder={true}/>
            </div>
            <div className='col-span-12 sm:col-span-7'>
                <Typography size='md' fontWeight={700} leading='relaxed'>
                    {aboutUsPageDescriptionBottom}
                </Typography>
            </div>
        </div>
    )
}