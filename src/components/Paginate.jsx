import React from 'react'
import { usePaginate } from '../context/paginateContext';

const Paginate = () => {
    const { page, totalPages, setPage } = usePaginate();

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <button type='button' onClick={handlePrevious} disabled={page === 1}>
                Previous
            </button>
            <span>
                Page {page} of {totalPages}
            </span>
            <button type='button' onClick={handleNext} disabled={page === totalPages}>
                Next
            </button>
        </form>
    );
}

export default Paginate