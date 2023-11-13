import { useState, useEffect } from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export const usePagination = <T>(items: T[], itemsPerPage: number) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPageNumber = parseInt(searchParams.get('page') as string) || 1;

    const [currentPage, setCurrentPage] = useState(currentPageNumber);

    // Calculate the total number of pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        if(searchParams.get('page')){
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', currentPage.toString());
            router.push(`${pathname}/?${params.toString()}`);
        }
    }, [currentPage, router]);

    useEffect(() => {
        if(currentPage !== 1){
            console.log('set page')
            setCurrentPage(1);
        }
    }, [items?.length]);

    // Function to change page
    const setPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Calculate the index of the first and last item on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);

    // Slice the items for the current page
    const currentItems = items.slice(startIndex, endIndex);

    return { currentItems, currentPage, setPage };
}
