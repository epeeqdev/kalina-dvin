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
    const {currentPage, currentItems, setPage} = usePagination(products ?? [], 10);
    const {getLanguage} = useLanguage()
    if(!products?.length) {
        return <Typography className='text-center mx-[5%] flex-1' size='lg'>{getLanguage(translates.noItems)}</Typography>
    }
    return <div className='flex-1'>
        <div className='grid grid-cols-2 md:grid-cols-4 mx-[5%] gap-[10px]'>
        {currentItems?.map(product => {
            return <ProductCard key={product._id} data={product}/>
        })}
    </div>
        {products?.length! > 10 && <PaginationComponent key={products?.length} totalItems={products?.length ?? 0} itemsPerPage={10}
                              currentPage={currentPage} onPageChange={setPage}/>}
    </div>
}