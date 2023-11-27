import {HomePageSlider} from "@/app/main/components//home-page-slider";
import {BrandsSlider} from "@/app/main/components/brands-slider";
import {CategoriesBlock} from "@/app/main/components/categories-block";
import React from "react";
import {AboutBlock} from "@/app/main/components/about-block";
import {getHomePageData} from "@/app/main/api-helpers/getHomePageData";


export default async function Home() {
    let [mainPage, categories, brands,_, aboutUs] = await getHomePageData()

    return (
        <main>
            <HomePageSlider slides={mainPage?.slides}/>
            <CategoriesBlock categories={categories}/>
            <BrandsSlider brands={brands}/>
            <AboutBlock data={aboutUs}/>
        </main>
    )
}
