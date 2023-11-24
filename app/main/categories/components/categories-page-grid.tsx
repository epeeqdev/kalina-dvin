import {CategoryResponseDTO} from "@/backend/types";
import {CategoryCard} from "@/app/main/components/category-card";
import PaginationComponent from "@/app/main/components/pagination";
import {usePagination} from "@/app/main/hooks/usePagination";
import {Input} from "@/app/main/components/controls/input";
import {useDebouncedState} from "@/utils/hooks/useDebouncedState";
import {useEffect, useState} from "react";
import {Typography} from "@/app/main/components/controls/typography";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {SEARCH_ERROR} from "@/app/main/categories/constants";


interface Props {
    categories: CategoryResponseDTO[]
}

export const CategoriesPageGrid = ({categories}: Props) => {
    const [searchResults,setSearchResults] = useState(categories)
    const {currentPage,currentItems, setPage} = usePagination(searchResults ?? [], 12);
    const [search, setSearch] = useDebouncedState('');
    const {getLanguage} = useLanguage()
    useEffect(() => {
        if(search){
            const regex = new RegExp(search, 'i')
            const results = categories.filter((item) => {
                    return regex.test(item.name.am) || regex.test(item.name.ru)
                }

            );
            setSearchResults(results);
        }else {
            setSearchResults(categories)
        }

    },[search])

    return(
        <div className='mx-[5%] mt-[4%] mb-[8%] m'>
            <Input onChange={(e) => setSearch(e.target.value)}/>
            {searchResults.length! ?
                <>
                    <div className='grid grid-cols-2 xl:grid-cols-3 gap-[10px] pt-[48px]'>
                        {currentItems?.map((item) =>(
                            <CategoryCard key={item._id} data={item} />
                        ))}
                    </div>
                    {searchResults?.length! > 12 &&
                        <PaginationComponent
                            key={searchResults?.length}
                            totalItems={searchResults?.length ?? 0}
                            itemsPerPage={12}
                            currentPage={currentPage}
                            onPageChange={setPage}
                        />}
                </>: <Typography size='2xl' className='mt-20'>{getLanguage(SEARCH_ERROR)}</Typography>
            }
        </div>
    )
}