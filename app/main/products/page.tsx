import {ProductsPageContent} from "@/app/main/products/components/page-content";
import {getProducts} from "@/app/main/api-helpers/getProducts";
import {getCategories} from "@/app/main/api-helpers/getCategories";
import {NextPage} from "next";

export default async function ProductsPage({searchParams}) {
    const [products, categories] = await Promise.all([getProducts(searchParams), getCategories()]);
    return <div>
        <div className="w-full h-[30vh] min-h-[200px] relative flex items-center justify-center">
            <img src="/productBackground.png" alt='products page background' className='absolute top-0 left-o w-full h-full object-cover'/>
            <h1 className='text-white relative text-header'>Продукты</h1>
        </div>
        <ProductsPageContent products={products} categories={categories}/>

    </div>
}