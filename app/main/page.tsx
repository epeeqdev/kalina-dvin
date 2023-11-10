import {Slider} from "@/app/main/components/swiper";
import {Carousel} from "@/app/main/components/carousel";
import {BlockBox} from "@/app/main/components/controls/block-box";
import {getBrandsData} from "@/app/main/get-main-data/get-brands-data";
import {getCurrentUrl} from "@/utils/heplers";


export default  async  function Home() {
    const origin = getCurrentUrl();
    const brands = await getBrandsData(origin)

    return (
    <main className="">
        <Slider/>
        <BlockBox
            header={{arm: 'Բրենդեր', ru: 'Категории'}}
            childrenClassName='pl-[24px] md:pl-[100px] xl:pl-[184px]'
            className='pt-[45px] lg:pt-[120px]'
        >
            <Carousel brands={brands}/>
        </BlockBox>
    </main>
  )
}
