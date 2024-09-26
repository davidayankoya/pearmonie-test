'use client'

import ReactPaginate from 'react-paginate';
import './pagination.scss'
import { Flex } from '@chakra-ui/react';

interface PaginationProps {
    onPageChange: (selectedItem: { selected: number; }) => void;
    pageCount: number;
    loading?: boolean;
    className?: string;
}

function Pagination({ onPageChange, pageCount, loading, className } : PaginationProps) {
    return (
        <Flex w='full' justify={['center', 'center', 'center', 'end']} overflowX='auto' className='scroll-custom'>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                className={className ?? ''}
                pageCount={pageCount}
                renderOnZeroPageCount={undefined}
                pageClassName={"pagination-item"}
                pageLinkClassName={"pagination-link"}
                previousClassName={"pagination-item"}
                previousLinkClassName={"pagination-link"}
                nextClassName={"pagination-item"}
                nextLinkClassName={"pagination-link"}
                breakClassName={"pagination-item"}
                breakLinkClassName={"pagination-link"}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </Flex>
    )
}

export default Pagination