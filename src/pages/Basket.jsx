import React, { useState } from 'react';
import Empty from '../components/Empty/Empty';
import Layout from '../components/Layout/Layout';

const Basket = (props) => {
    const [basket, setBasket] = useState([]);
    return (
        <>
            {!!basket.length ? (
                <Layout>
                    <h2>Корзина</h2>
                </Layout>
            ) : (
                <Empty type='basket' />
            )}
        </>
    );
};

export { Basket };
