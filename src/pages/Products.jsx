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
import useResize from '../hooks/useResize';
import Filters from '../components/Filters/Filters';

const Products = ({ isFav = false, isCat = false }) => {
    const screenWidth = useResize(window.innerWidth);
    const { name } = useParams();
    const { products } = useContext(Context);
    const { filterProducts } = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const [filterGoods, setFilterGoods] = useState([]); //Результат после фильтрации

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
        paginate.step(1);
    }, [filterGoods]);

    return (
        <>
            {isCat && <Banner title={names[name] || name} bg={bannersData[0].bg} />}
            <Layout title={isFav && 'Любимые товары'} top={'top'} mb={3} dt={4}>
                <Layout>
                    <div className='filters'>
                        <Filters
                            goods={goods}
                            filterGoods={filterGoods}
                            setFilterGoods={setFilterGoods}
                        />
                    </div>
                </Layout>
                <div
                    style={
                        screenWidth > 1064
                            ? { gridColumnEnd: 'span 3' }
                            : { gridColumnEnd: 'span 2' }
                    }
                >
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
