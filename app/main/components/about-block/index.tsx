import {BLOCK_TITLE} from "@/app/main/components/about-block/costants";
import {AboutGrid} from "@/app/main/components/about-block/components/about-grid";
import {AboutUsDTO} from "@/backend/types";
import {HomePageSection} from "@/app/main/components/home-page-section";

interface Props{
    data:AboutUsDTO
}
export const AboutBlock = ({data}: Props) => {
    return  (
        <HomePageSection
            header={BLOCK_TITLE}
            childrenClassName='px-[5%]'
            className='pt-[25px] lg:pt-[45px] pb-[45px]'
        >
            <AboutGrid aboutOptions={data}/>
        </HomePageSection>
    )
}