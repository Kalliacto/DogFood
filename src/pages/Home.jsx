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
import useResize from '../hooks/useResize';

const Home = () => {
    const screenWidth = useResize(window.innerWidth);
    const { news, newsLenta } = useSelector((s) => s.news);
    const favGoods = goodsData
        .filter((el) => el.reviews.length > 0)
        .sort((a, b) => {
            const sumA = a.reviews.reduce((acc, value) => acc + value.rating, 0) / a.reviews.length;
            const sumB = b.reviews.reduce((acc, value) => acc + value.rating, 0) / b.reviews.length;
            return sumB - sumA;
        });

    const newGoods = [...goodsData].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return (
        <>
            <Banner {...bannersData[0]} />
            <Layout>
                <Adds {...addsData[0]} />
            </Layout>
            {newGoods.length && (
                <Layout mb={2} dt={4} title='Наши новинки'>
                    {newGoods.map((el) => {
                        return <Card key={el._id} {...el} />;
                    })}
                </Layout>
            )}

            <Layout dt={2}>
                <Adds {...addsData[1]} />
                <Adds {...addsData[2]} />
            </Layout>

            {!!newsLenta?.length ? (
                <Layout mb={1} dt={2} title={'Новости пёселей Lenta.ru'}>
                    <Carousel
                        data={newsLenta.map((el, i) => (
                            <News key={`news=${i}`} data={el} />
                        ))}
                        cnt={screenWidth < 1064 ? 1 : 2}
                    />
                </Layout>
            ) : (
                <Preloader />
            )}
            {goodsData.length && (
                // TODO: Сделать фильтрацию просмотренного
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
