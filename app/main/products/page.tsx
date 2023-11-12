import {ProductsPageContent} from "@/app/main/products/components/page-content";
import {getProducts} from "@/app/main/api-helpers/getProducts";
import {getCategories} from "@/app/main/api-helpers/getCategories";
import {NextPage} from "next";
import {Typography} from "@/app/main/components/controls/typography";

interface NextPageProps {
    searchParams: string
}
export default async function ProductsPage({searchParams}:NextPageProps) {
    const [products, categories] = await Promise.all([getProducts(searchParams), getCategories()]);
    return <div>
        <div className="w-full md:h-[30vh] md:min-h-[200px] h-[200px] relative flex items-center justify-center">
            <Typography color='white' size='4xl' as='h1' className='relative z-10'>Продукты</Typography>
            <img src="/productBackground.png" alt='products page background' className='absolute top-0 left-o w-full h-full object-cover'/>
        </div>
        <ProductsPageContent products={products} categories={categories}/>
    </div>
}