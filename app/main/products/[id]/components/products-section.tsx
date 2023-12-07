import {ProductResponseDTO} from "@/backend/types";
import {ProductCard} from "@/app/main/products/components/product-card";
import {Typography} from "@/app/main/components/controls/typography";
import {useLanguage} from "@/app/main/hooks/useLanguage";


interface Props {
    products: ProductResponseDTO;
}
const translates = {
    similarProducts: {
        am: 'Նմանատիպ ապրանքներ',
        ru: 'Похожие продукты'
    }
}

export const ProductsSection = ({products}:Props) => {

    const {getLanguage} = useLanguage()
    return (
        <>
            {products.relatedProducts.length ? <div className='mt-[87px] relative mx-[5%]'>
                <Typography size='4xl'>{getLanguage(translates.similarProducts)}</Typography>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 pt-[56px]'>
                    {
                        products.relatedProducts.map((item) => (
                            <ProductCard data={item} key={item._id}/>
                        ))
                    }
                </div>
            </div>: null

            }
        </>
    )
}