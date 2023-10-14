import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Empty from '../components/Empty/Empty';

const Favorites = (props) => {
    const [favorites, setFavorites] = useState([]);
    return (
        <>
            {!!favorites.length ? (
                <Layout>
                    <h2>Любимые товары</h2>
                </Layout>
            ) : (
                <Empty type='favorite' />
            )}
        </>
    );
};

export { Favorites };
