import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Layout from '../components/Layout/Layout';
import { Context } from '../context/context';
import Card from '../components/Card/Card';
import Banner from '../components/Banner/Banner';
import bannersData from '../assets/data/banners.json';
import UtilsCtx from '../context/utils';

const Products = ({ isFav = false, isCat = false }) => {
    const { products } = useContext(Context);
    const { filterProducts } = useContext(UtilsCtx);
    const [goods, setGoods] = useState([]);
    const [filterGoods, setFilterGoods] = useState([]);
    const { name } = useParams();
    const names = {
        outerwear: 'Одежда',
        toys: 'Игрушки',
        delicious: 'Лакомства',
        other: 'Прочие товары',
    };

    // const goods = products.filter((el) => {
    //     if (name === 'other') {
    //         return !el.tags.includes(
    //             (category) =>
    //                 category === 'outerwear' && category === 'toys' && category === 'delicious'
    //         );
    //         // return el.tags.includes((category) => category === 'other');
    //     }
    //     if (name) {
    //         return el.tags.includes(name);
    //     }
    //     return el;
    // });

    useEffect(() => {
        if (name === 'other') {
            setGoods(
                filterProducts(products)
                    .byTag('outerwear', false)
                    .byTag('toys', false)
                    .byTag('delicious', false).data
            );
        } else if (name) {
            setGoods(filterProducts(products).byTag(name).data);
        } else {
            setGoods(filterProducts(products).data);
        }
    }, [name]);

    useEffect(() => {
        setFilterGoods(goods);
    }, [goods]);

    return (
        <>
            {isCat && <Banner title={names[name] || name} bg={bannersData[0].bg} />}
            <Layout>
                {isFav && <h2>Любимые товары</h2>}
                {!isFav && !isCat && <h2>Страница товаров</h2>}
                <Layout mb={2} dt={4}>
                    {filterGoods.map((el) => {
                        return <Card key={el._id} {...el} />;
                    })}
                </Layout>
            </Layout>
        </>
    );
};

export { Products };
