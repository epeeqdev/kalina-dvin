import {Slider} from "@/app/main/components/swiper";
import {Carousel} from "@/app/main/components/carousel";
import {BlockBox} from "@/app/main/components/controls/block-box";
import {getBrandsData} from "@/app/main/get-main-data/get-brands-data";
import {getCurrentUrl} from "@/utils/heplers";
import {CategoriesBlock} from "@/app/main/components/categories-block";


export default  async  function Home() {
    const origin = getCurrentUrl();
    const brands = await getBrandsData(origin)

    return (
    <main className="">
        <Slider/>
        <CategoriesBlock/>
        <BlockBox
            header={{am: 'Բրենդեր', ru: 'Бренды'}}
            childrenClassName='pl-[5%]'
            className='pt-[45px] lg:pt-[120px] pb-[45px]'
        >
            <Carousel brands={brands}/>
        </BlockBox>
    </main>
  )
}
