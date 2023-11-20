import {ProductsPageContent} from "@/app/main/products/components/page-content";
import {getProducts} from "@/app/main/api-helpers/getProducts";
import {getCategories} from "@/app/main/api-helpers/getCategories";
import {getBrands} from "@/app/main/api-helpers/getBrands";
import {getProductsPage} from "@/app/main/api-helpers/getProductsPage";
import {PageHeaderBackground} from "@/app/main/components/page-header-background";

interface NextPageProps {
    searchParams: string
}
const translates = {
    productTitle: {
        am: 'Ապրանքներ',
        ru: 'Продукты'
    }
}
export default async function ProductsPage({searchParams}:NextPageProps) {
    const [products, categories, brands, productsPage] = await Promise.all([getProducts(searchParams), getCategories(), getBrands(), getProductsPage()]);
    return <div>
        <PageHeaderBackground title={translates.productTitle} imageData={productsPage.image}/>
        <ProductsPageContent products={products} categories={categories} brands={brands}/>
    </div>
}