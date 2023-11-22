import {Typography} from "@/app/main/components/controls/typography";
import {LogoIcon} from "@/app/main/components/logoIcon";

interface Props {
    aboutUsPageDescriptionTop: string
}


export const DescriptionTop = ({aboutUsPageDescriptionTop}:Props) => {
    return(
        <div>
            <div className='bg-primary w-full relative pr-[14%] py-[5%] box-border h-[200px] sm:h-auto'>
                <div className='flex justify-end'>
                    <LogoIcon color='white' className='hidden sm:block'/>
                    <div className='absolute left-0 top-14 sm:-bottom-4 sm:top-[unset] transform sm:translate-y-1/2 w-full'>
                            <img src='/cargo.png' alt='footerLogo' className='w-[414px] sm:w-[50%]'/>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-[6%] px-[7%] items-center pt-[17%] pb-[7%] md:pt-[7%]'>
                <Typography className='col-span-12 md:col-span-6 md:col-start-6' size='md' fontWeight={700} leading='relaxed'>
                    {aboutUsPageDescriptionTop}
                </Typography>
            </div>
        </div>
    )
}