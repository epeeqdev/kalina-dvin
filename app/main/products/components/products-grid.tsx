import {ProductResponseDTO} from "@/backend/types";
import {ProductCard} from "@/app/main/products/components/product-card";
import PaginationComponent from "@/app/main/components/pagination";
import {usePagination} from "@/app/main/hooks/usePagination";
import {Typography} from "@/app/main/components/controls/typography";
import {useLanguage} from "@/app/main/hooks/useLanguage";

interface Props {
    products?: ProductResponseDTO[]
}

const translates = {
    noItems: {
        am: 'Ապրանքներ չեն գտնվել',
        ru: 'Продукты не найдены'
    }
}

export const ProductsGrid = ({products}:Props) => {
    const {currentPage, currentItems, setPage} = usePagination(products ?? [], 15);
    const {getLanguage} = useLanguage()
    if(!products?.length) {
        return <Typography className='text-center flex-1' size='2xl'>{getLanguage(translates.noItems)}</Typography>
    }
    return <div className='flex-1'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5'>
        {currentItems?.map(product => {
            return <ProductCard key={product._id} data={product}/>
        })}
    </div>
        {products?.length! > 15 && <PaginationComponent key={products?.length} totalItems={products?.length ?? 0} itemsPerPage={15}
                              currentPage={currentPage} onPageChange={setPage}/>}
    </div>
}