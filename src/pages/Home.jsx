import React from 'react';
import Layout from '../components/Layout/Layout';
import bannersData from '../assets/data/banners.json';
import addsData from '../assets/data/adds.json';
import Banner from '../components/Banner/Banner';
import Adds from '../components/Adds/Adds';

const Home = (props) => {
    return (
        <>
            <Banner {...bannersData[0]} />
            <Layout>
                <Adds {...addsData[0]} />
            </Layout>
            <Layout dt={2}>
                <Adds {...addsData[1]} />
                <Adds {...addsData[2]} />
            </Layout>
        </>
    );
};

export { Home };
