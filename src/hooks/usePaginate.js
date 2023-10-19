import { useState } from 'react';

const usePaginate = (arr, screenWidth) => {
    let count = 9;
    if (screenWidth < 500) {
        count = 4;
    }

    const [page, setPage] = useState(1);
    const maxPage = Math.ceil(arr.length / count);

    const step = (num) => {
        if (num > 1 || num < maxPage) {
            setPage(num);
        }
    };

    const previousPage = () => {
        if (page > 1) {
            setPage((page) => page - 1);
        }
        // setPage(Math.max(1, page - 1));
    };

    const nextPage = () => {
        if (page < page + 1) {
            setPage((page) => page + 1);
        }
        // setPage(Math.min(maxPage, page + 1));
    };

    const startPage = () => {
        setPage(1);
    };

    const endPage = () => {
        setPage(maxPage);
    };

    const getPage = () => {
        // Логика подсчета страниц
        // page = (1)[0 - count];
        // page = (2)[count - count * 2];
        // page = (3)[count * 2 - count * 3];

        return arr.slice((page - 1) * count, count * page);
    };

    return { page, step, maxPage, previousPage, nextPage, startPage, endPage, getPage };
};

export default usePaginate;
