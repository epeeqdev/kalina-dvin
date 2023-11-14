import {BlockBox} from "@/app/main/components/controls/block-box";
import {BLOCK_TITLE} from "@/app/main/components/about-block/costants";
import {AboutGrid} from "@/app/main/components/about-block/components/about-grid";
import {AboutUsDTO} from "@/backend/types";

interface Props{
    data:AboutUsDTO
}
export const AboutBlock = ({data}: Props) => {
    return  (
        <BlockBox
            header={BLOCK_TITLE}
            childrenClassName='px-[5%]'
            className='pt-[45px] lg:pt-[60px] pb-[45px]'
        >
            <AboutGrid aboutOptions={data}/>
        </BlockBox>
    )
}