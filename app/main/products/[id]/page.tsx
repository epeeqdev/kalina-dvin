import {getProduct} from "@/app/main/api-helpers/getProduct";
import {ProductContent} from "@/app/main/products/[id]/product-content";


export default async function Product({params}) {
    const product = await getProduct(params.id);
    return <ProductContent data={product}/>
}