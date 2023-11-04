import React, { useContext } from 'react';
import Empty from '../components/Empty/Empty';
import Layout from '../components/Layout/Layout';
import BasketInfo from '../components/BasketInfo/BasketInfo';
import { useSelector } from 'react-redux';
import UtilsCtx from '../context/utils';
import Adds from '../components/Adds/Adds';
import addsData from '../assets/data/adds.json';
import Card from '../components/Card/Card';
import useResize from '../hooks/useResize';

const Basket = () => {
    const { basketProducts } = useSelector((s) => s.basket);
    const { productsInLocal } = useSelector((s) => s.viewed);
    const { setCntWord, getNumber } = useContext(UtilsCtx);
    const screenWidth = useResize(window.innerWidth);

    return (
        <>
            {basketProducts.length ? (
                <Layout>
                    <h1>
                        В корзине {basketProducts.length} {setCntWord(basketProducts.length)}
                    </h1>
                    <BasketInfo />
                    <Layout>
                        <Adds {...addsData[getNumber(addsData.length)]} />
                    </Layout>
                    {/* TODO: Доработать изменение лайка в просмотренных товарах */}
                    {!!productsInLocal.length && (
                        <Layout mb={2} dt={4} title='Недавно просмотренные'>
                            {productsInLocal
                                .map((el) => {
                                    return <Card key={el._id} {...el} />;
                                })
                                .slice(0, screenWidth < 1064 ? 2 : 4)}
                        </Layout>
                    )}
                </Layout>
            ) : (
                <Layout>
                    <Empty type='basket' />
                    <Layout>
                        <Adds {...addsData[getNumber(addsData.length)]} />
                    </Layout>
                    {/* TODO: Доработать изменение лайка в просмотренных товарах */}
                    {!!productsInLocal.length && (
                        <Layout mb={2} dt={4} title='Недавно просмотренные'>
                            {productsInLocal
                                .map((el) => {
                                    return <Card key={el._id} {...el} />;
                                })
                                .slice(0, screenWidth < 1064 ? 2 : 4)}
                        </Layout>
                    )}
                </Layout>
            )}
        </>
    );
};

export { Basket };
