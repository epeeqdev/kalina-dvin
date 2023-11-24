'use client'
import React from 'react';
import clsx from "clsx";
import IconComponent from "@/components/icon";
import {ReactPagination} from "@/app/main/components/pagination/paginate";

type PaginationComponentProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (selectedPage: number) => void;
    className?: string;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({
     totalItems,
     itemsPerPage,
     currentPage,
     onPageChange,
     className
 }) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (event: {
        selected: number
    }) => {
        onPageChange(event.selected + 1);
    };

    return (
        <div className='mt-12 flex justify-center'>
            <ReactPagination
                previousLabel={<IconComponent className='hover:bg-primary hover:text-white transition' name='chevronLeft' size='lg'/>}
                nextLabel={<IconComponent className='hover:bg-primary hover:text-white transition' name='chevronRight' size='lg'/>}
                breakLabel={'...'}
                pageCount={totalPages}
                pageRangeDisplayed={5}
                forcePage={currentPage - 1}
                onPageChange={handlePageClick}
                containerClassName={clsx('flex justify-center items-center gap-[2px] my-4', className)}
                pageLinkClassName={'p-1 cursor-pointer bg-primary text-white hover:bg-primary-darker w-[32px] h-[32px] flex items-center justify-center block'}
                breakClassName={''}
                activeClassName={'bg-secondary hover:bg-secondary-darker'}
                disabledClassName={'bg-primary text-white opacity-20 cursor-not-allowed'}
            />
        </div>

    );
};

export default PaginationComponent;
