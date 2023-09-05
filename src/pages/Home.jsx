import React from 'react';
import Layout from '../components/Layout/Layout';
import bannersData from '../assets/data/banners.json';
import addsData from '../assets/data/adds.json';
import Banner from '../components/Banner/Banner';
import Adds from '../components/Adds/Adds';
import { useSelector } from 'react-redux';
import News from '../components/News/News';
import Carousel from '../components/Carousel/Carousel';
import Preloader from '../components/Preloader/Preloader';
import goodsData from '../assets/data/goods.json';
import Card from '../components/Card/Card';

const Home = () => {
    const { news, newsLenta } = useSelector((s) => s.news);

    return (
        <>
            <Banner {...bannersData[0]} />
            <Layout>
                <Adds {...addsData[0]} />
            </Layout>
            {goodsData.length && (
                <Layout mb={2} dt={4} title='Наши новинки'>
                    {goodsData.map((el) => {
                        return <Card key={el._id} {...el} />;
                    })}
                </Layout>
            )}
            {!!news?.length ? (
                <Layout mb={2} dt={4} title={'Последние новости о пёселях'}>
                    <Carousel
                        data={news.map((el, i) => (
                            <News key={`news=${i}`} data={el} isTitled={true} />
                        ))}
                        cnt={window.innerWidth < 1064 ? 2 : 4}
                    />
                </Layout>
            ) : (
                <Preloader />
            )}
            <Layout dt={2}>
                <Adds {...addsData[1]} />
                <Adds {...addsData[2]} />
            </Layout>
            {goodsData.length && (
                <Layout mb={2} dt={4} title='Популярные товары'>
                    {goodsData.map((el) => {
                        return <Card key={el._id} {...el} />;
                    })}
                </Layout>
            )}
            {!!newsLenta?.length ? (
                <Layout mb={1} dt={2} title={'Новосте пёселей Lenta.ru'}>
                    <Carousel
                        data={newsLenta.map((el, i) => (
                            <News key={`news=${i}`} data={el} />
                        ))}
                        cnt={window.innerWidth < 1064 ? 1 : 2}
                    />
                </Layout>
            ) : (
                <Preloader />
            )}
            {goodsData.length && (
                <Layout mb={2} dt={4} title='Недавно просмотренные'>
                    {goodsData.map((el) => {
                        return <Card key={el._id} {...el} />;
                    })}
                </Layout>
            )}
            <Layout>
                <Adds {...addsData[5]} />
            </Layout>
        </>
    );
};

export { Home };
