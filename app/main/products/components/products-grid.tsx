import {ProductResponseDTO} from "@/backend/types";
import {ProductCard} from "@/app/main/products/components/product-card";
import PaginationComponent from "@/app/main/components/pagination";
import {usePagination} from "@/app/main/hooks/usePagination";
import {Typography} from "@/app/main/components/controls/typography";

interface Props {
    products?: ProductResponseDTO[]
}

export const ProductsGrid = ({products}:Props) => {
    const {currentPage, currentItems, setPage} = usePagination(products ?? [], 10);
    if(!products?.length) {
        return <Typography className='text-center' size='lg'>No products</Typography>
    }
    return <div>
        <div className='grid grid-cols-2 md:grid-cols-4 mx-[5%] gap-[10px]'>
        {currentItems?.map(product => {
            return <ProductCard key={product._id} data={product}/>
        })}
    </div>
        {products?.length! > 10 && <PaginationComponent key={products?.length} totalItems={products?.length ?? 0} itemsPerPage={10}
                              currentPage={currentPage} onPageChange={setPage}/>}
    </div>
}