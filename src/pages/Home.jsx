import React from 'react';
import Layout from '../components/Layout/Layout';
import bannersData from '../assets/data/banners.json';
import Banner from '../components/Banner/Banner';

const Home = (props) => {
    return (
        <div>
            <Layout>
                <Banner {...bannersData[0]} />
                <Banner {...bannersData[1]} />
            </Layout>
        </div>
    );
};

export { Home };
