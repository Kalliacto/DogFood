import React from 'react';
import Layout from '../components/Layout/Layout';
import bannersData from '../assets/data/banners.json';
import addsData from '../assets/data/adds.json';
import Banner from '../components/Banner/Banner';
import Adds from '../components/Adds/Adds';
import { useSelector } from 'react-redux';
import News from '../components/News/News';
import Carousel from '../components/Carousel/Carousel';

const Home = () => {
    const { news, newsLenta } = useSelector((s) => s.news);

    return (
        <>
            <Banner {...bannersData[0]} />
            <Layout>
                <Adds {...addsData[0]} />
            </Layout>
            <Layout mb={2} dt={4} title={'Последние новости о пёселях'}>
                {!!news.length && (
                    <Carousel
                        data={news.map((el, i) => (
                            <News key={`news=${i}`} data={el} isTitled={true} />
                        ))}
                        cnt={window.innerWidth < 1064 ? 2 : 4}
                    />
                )}
            </Layout>
            <Layout dt={2}>
                <Adds {...addsData[1]} />
                <Adds {...addsData[2]} />
            </Layout>
            <Layout mb={1} dt={2} title={'Новосте пёселей Lenta.ru'}>
                {!!newsLenta.length && (
                    <Carousel
                        data={newsLenta.map((el, i) => (
                            <News key={`news=${i}`} data={el} />
                        ))}
                        cnt={window.innerWidth < 1064 ? 1 : 2}
                    />
                )}
            </Layout>
        </>
    );
};

export { Home };
