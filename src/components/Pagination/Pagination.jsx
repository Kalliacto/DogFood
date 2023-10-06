import React from 'react';
import './Pagination.css';

const Pagination = ({ hook }) => {
    return (
        <div className='pagination'>
            <button
                className='pagination__btn'
                disabled={hook.page === 1}
                onClick={() => hook.startPage()}
            >
                <i className='lni lni-angle-double-left' />
            </button>
            <button
                className='pagination__btn'
                onClick={() => hook.previousPage()}
                disabled={hook.page === 1}
            >
                <i class='lni lni-chevron-left' />
            </button>
            {hook.page > 2 && '...'}
            {hook.page > 1 && (
                <button className='pagination__btn' onClick={(e) => hook.step(hook.page - 1)}>
                    {hook.page - 1}
                </button>
            )}

            <button className='pagination__btn pagination__btn_active'>{hook.page}</button>
            {hook.page + 1 <= hook.maxPage && (
                <button className='pagination__btn' onClick={(e) => hook.step(hook.page + 1)}>
                    {hook.page + 1}
                </button>
            )}
            {hook.page < hook.maxPage - 1 && '...'}
            <button
                className='pagination__btn'
                onClick={() => hook.nextPage()}
                disabled={hook.maxPage === hook.page}
            >
                <i class='lni lni-chevron-right' />
            </button>
            <button
                className='pagination__btn'
                disabled={hook.maxPage === hook.page}
                onClick={() => hook.endPage()}
            >
                <i class='lni lni-angle-double-right' />
            </button>
        </div>
    );
};

export default Pagination;
