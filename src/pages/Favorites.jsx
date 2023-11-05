import React, { useContext, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Empty from '../components/Empty/Empty';
import { Context } from '../context/context';
import { getEndings } from '../utils/utils';
import Card from '../components/Card/Card';

const Favorites = () => {
    const { favorite } = useContext(Context);

    return (
        <>
            {!!favorite?.length ? (
                <Layout>
                    <h1>
                        В избранном {favorite.length} {getEndings(favorite.length, 'товар')}
                    </h1>
                    <Layout md={2} dt={4}>
                        {favorite.map((el) => (
                            <Card key={el._id} {...el} />
                        ))}
                    </Layout>
                </Layout>
            ) : (
                <Empty type='favorite' />
            )}
        </>
    );
};

export { Favorites };
