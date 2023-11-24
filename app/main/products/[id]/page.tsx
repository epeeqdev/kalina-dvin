import {getProduct} from "@/app/main/api-helpers/getProduct";
import {ProductContent} from "@/app/main/products/[id]/product-content";
import {getProducts} from "@/app/main/api-helpers/getProducts";


export default async function Product({params}) {
    const product = await getProduct(params.id);
    const products = await getProducts({category:`${product.categories[0]._id}`})
    return <ProductContent data={product} products={products} selectedProductId={params.id}/>
}