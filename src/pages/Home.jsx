import React from 'react';
import Layout from '../components/Layout/Layout';

const Home = (props) => {
    return (
        <div>
            <p>Home</p>
            <Layout mb={1} dt={1} />
            <Layout mb={4} dt={2} gap='small' />
            <Layout mb={2} dt={4} />
            <Layout mb={3} dt={3} />
        </div>
    );
};

export { Home };
