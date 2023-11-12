import {Typography} from "@/app/main/components/controls/typography";

export const  CategoryCard = () => {
    return(
        <div>
            <div className='relative pt-[60%] mb-4'>
                <img src='/categories.png' alt='productBackground' className='absolute top-0 left-0 w-full h-full'/>
            </div>
            <Typography fontWeight={500} size='xl'>Մազի Ներկեր</Typography>
        </div>
    )
}