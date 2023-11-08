import React, { memo, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../components/Layout/Layout';
import { Context } from '../context/context';
import Card from '../components/Card/Card';
import Banner from '../components/Banner/Banner';
import UtilsCtx from '../context/utils';
import usePaginate from '../hooks/usePaginate';
import Pagination from '../components/Pagination/Pagination';
import useResize from '../hooks/useResize';
import Filters from '../components/Filters/Filters';
import Empty from '../components/Empty/Empty';
import Sort from '../components/Sort/Sort';

const Products = memo(({ isCat = false }) => {
    const screenWidth = useResize(window.innerWidth);
    const { name } = useParams();
    const { products } = useContext(Context);
    const { filterProducts, sortProducts } = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const [filterGoods, setFilterGoods] = useState([]); //Результат после фильтрации

    const names = {
        outerwear: 'Одежда',
        toys: 'Игрушки',
        delicious: 'Лакомства',
        other: 'Прочие товары',
    };

    const paginate = usePaginate(filterGoods, screenWidth);

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
        setFilterGoods(sortProducts(goods).byDate().data);
    }, [goods]);

    useEffect(() => {
        paginate.step(1);
    }, [filterGoods]);

    return (
        <>
            {goods.length > 0 && (
                <>
                    {isCat && (
                        <Banner title={names[name] || name} main={false} bg='paws' pattern={true} />
                    )}
                    <Layout
                        mb={screenWidth < 500 ? 1 : 3}
                        dt={4}
                        fullHeight={true}
                        // style={screenWidth < 500 ? { display: 'block' } : { display: 'grid' }}
                    >
                        <Layout>
                            <Filters
                                goods={goods}
                                filterGoods={filterGoods}
                                setFilterGoods={setFilterGoods}
                            />
                        </Layout>
                        <div
                            style={
                                screenWidth > 1064
                                    ? { gridColumnEnd: 'span 3' }
                                    : { gridColumnEnd: 'span 2' }
                            }
                        >
                            <Sort setState={setFilterGoods} filterGoods={filterGoods} />
                            {filterGoods?.length > 0 ? (
                                <>
                                    <Layout mb={1} dt={3}>
                                        {paginate.getPage().map((el) => (
                                            <Card key={el._id} {...el} />
                                        ))}
                                    </Layout>
                                    <Pagination hook={paginate} />
                                </>
                            ) : (
                                <Empty type='filter' />
                            )}
                        </div>
                    </Layout>
                </>
            )}
            {goods.length === 0 && <Empty type='category' />}
        </>
    );
});

export { Products };
