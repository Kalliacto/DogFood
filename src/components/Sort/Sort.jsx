import React, { useContext, useEffect, useState } from 'react';
import './Sort.css';
import UtilsCtx from '../../context/utils';

const Sort = ({ setState, filterGoods }) => {
    const { sortProducts } = useContext(UtilsCtx);
    const [sortName, setSortName] = useState(0);
    const [sortPrice, setSortPrice] = useState(0);
    const [sortDiscount, setSortDiscount] = useState(0);
    const [sortPopular, setSortPopular] = useState(0);

    useEffect(() => {
        setState((state) => [...sortProducts(state).byDate().data]);
        if (sortName) {
            setState((state) => [
                ...sortProducts(state).byName(sortName === 1 ? 'up' : 'down').data,
            ]);
        }
        if (sortPopular) {
            setState((state) => [
                ...sortProducts(state).byPopular(sortPopular === 1 ? 'down' : 'up', true).data,
            ]);
        }
        if (sortPrice) {
            setState((state) => [
                ...sortProducts(state).byPrice(sortPrice === 1 ? 'up' : 'down').data,
            ]);
        }
        if (sortDiscount) {
            setState((state) => [
                ...sortProducts(state).byDiscount(sortDiscount === 1 ? 'down' : 'up').data,
            ]);
        }
    }, [sortName, sortPrice, sortDiscount, sortPopular, filterGoods]);

    return (
        <div className='sort'>
            <button
                className={`sort__btn ${sortName ? 'sort__btn_active' : ''} `}
                onClick={() => setSortName(sortName >= 2 ? 0 : sortName + 1)}
            >
                <i className={`lni lni-sort-amount-${sortName === 2 ? 'd' : 'a'}sc`} />
                <span>По названию</span>
            </button>
            <button
                className={`sort__btn ${sortPrice ? 'sort__btn_active' : ''}`}
                onClick={() => setSortPrice(sortPrice >= 2 ? 0 : sortPrice + 1)}
            >
                <i className={`lni lni-sort-amount-${sortPrice === 2 ? 'd' : 'a'}sc`} />
                <span>По цене</span>
            </button>
            <button
                className={`sort__btn ${sortDiscount ? 'sort__btn_active' : ''}`}
                onClick={() => setSortDiscount(sortDiscount >= 2 ? 0 : sortDiscount + 1)}
            >
                <i className={`lni lni-sort-amount-${sortDiscount === 2 ? 'a' : 'd'}sc`} />
                <span>По скидке</span>
            </button>
            <button
                className={`sort__btn ${sortPopular ? 'sort__btn_active' : ''}`}
                onClick={() => setSortPopular(sortPopular >= 2 ? 0 : sortPopular + 1)}
            >
                <i className={`lni lni-sort-amount-${sortPopular === 2 ? 'a' : 'd'}sc`} />
                <span>По популярности</span>
            </button>
        </div>
    );
};

export default Sort;
