import React, { useContext } from 'react';
import { useParams } from 'react-router';
import Layout from '../components/Layout/Layout';
import { Context } from '../context/context';
import Card from '../components/Card/Card';
import Banner from '../components/Banner/Banner';
import bannersData from '../assets/data/banners.json';

const Products = ({ isFav = false, isCat = false }) => {
    const { products } = useContext(Context);
    const { name } = useParams();
    const names = {
        outerwear: 'Одежда',
        delicious: 'Лакомства',
        toys: 'Игрушки',
        other: 'Прочие товары',
    };

    const goods = products.filter((el) => {
        if (name === 'other') {
            // return el.includes(category => category === 'other')
            return !el.tags.includes(
                (category) =>
                    category === 'outerwear' && category === 'toys' && category === 'delicious'
            );
        } else if (name) {
            return el.tags.includes(name);
        } else {
            return el;
        }
    });

    return (
        <>
            {isCat && <Banner title={names[name]} bg={bannersData[0].bg} />}
            <Layout>
                {isFav && <h2>Любимые товары</h2>}
                {!isFav && !isCat && <h2>Страница товаров</h2>}
                <Layout mb={2} dt={4}>
                    {goods.map((el) => {
                        return <Card key={el._id} {...el} />;
                    })}
                </Layout>
            </Layout>
        </>
    );
};

export { Products };
