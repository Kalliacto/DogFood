import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../components/Layout/Layout';
import { Context } from '../context/context';
import Card from '../components/Card/Card';
import Banner from '../components/Banner/Banner';
import bannersData from '../assets/data/banners.json';
import UtilsCtx from '../context/utils';
import usePaginate from '../hooks/usePaginate';
import Pagination from '../components/Pagination/Pagination';

// TODO: Сброс фильтров
const Products = ({ isFav = false, isCat = false }) => {
    const { name } = useParams();
    const { products } = useContext(Context);
    const { filterProducts, getUniqueTag, getUniqueAuthors } = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const [filterGoods, setFilterGoods] = useState([]); //Результат после фильтрации
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);

    const names = {
        outerwear: 'Одежда',
        toys: 'Игрушки',
        delicious: 'Лакомства',
        other: 'Прочие товары',
    };
    const paginate = usePaginate(filterGoods, 9);

    useEffect(() => {
        if (name === 'other') {
            setGoods(
                filterProducts(products).byTag(['outerwear', 'toys', 'delicious'], false).data
            );
        } else if (name) {
            setGoods(filterProducts(products).byTag(name).data);
        } else {
            setGoods(filterProducts(products).data);
        }
        paginate.step(1);
    }, [name, products]);

    useEffect(() => {
        setAuthors(getUniqueAuthors(goods));
        setTags(getUniqueTag(goods));
        setFilterGoods(goods);
    }, [goods]);

    useEffect(() => {
        paginate.step(1);
    }, [filterGoods]);

    return (
        <>
            {isCat && <Banner title={names[name] || name} bg={bannersData[0].bg} />}
            <Layout title={isFav && 'Любимые товары'} top={'top'} mb={3} dt={4}>
                <Layout>
                    <div className='filters'>
                        {!!tags.length && (
                            <>
                                <h4>Фильтр по тегам</h4>
                                <ul>
                                    {tags.map((el) => {
                                        return (
                                            <li
                                                key={el}
                                                className='filter__item'
                                                onClick={() =>
                                                    setFilterGoods(
                                                        filterProducts(goods).byTag(el).data
                                                    )
                                                }
                                            >
                                                {el}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                        {!!authors.length && (
                            <>
                                <h4>Фильтр по авторам</h4>
                                <ul>
                                    {authors.map((el) => {
                                        return (
                                            <li
                                                className='filter__item'
                                                onClick={() =>
                                                    setFilterGoods(
                                                        filterProducts(goods).byAuthor(el).data
                                                    )
                                                }
                                                key={el}
                                            >
                                                {el}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                    </div>
                </Layout>
                <div style={{ gridColumnEnd: 'span 3' }}>
                    <Layout mb={1} dt={3}>
                        {paginate.getPage().map((el) => {
                            return <Card key={el._id} {...el} />;
                        })}
                    </Layout>
                    <Pagination hook={paginate} />
                </div>
            </Layout>
        </>
    );
};

export { Products };
