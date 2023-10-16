import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import bannersData from '../assets/data/banners.json';
import addsData from '../assets/data/adds.json';
import Banner from '../components/Banner/Banner';
import Adds from '../components/Adds/Adds';
import { useSelector } from 'react-redux';
import News from '../components/News/News';
import Carousel from '../components/Carousel/Carousel';
import Preloader from '../components/Preloader/Preloader';
// import goodsData from '../assets/data/goods.json';
import Card from '../components/Card/Card';
import useResize from '../hooks/useResize';
import { Context } from '../context/context';
import Empty from '../components/Empty/Empty';
import UtilsCtx from '../context/utils';

const Home = () => {
    const screenWidth = useResize(window.innerWidth);
    const { news, newsLenta } = useSelector((s) => s.news);
    const { products, userId } = useContext(Context);
    const { getNumber, sortProducts } = useContext(UtilsCtx);

    const favGoods = sortProducts(products)
        .byPopular('down', true)
        .data.slice(0, screenWidth < 1064 ? 2 : 4);

    const newGoods = sortProducts(products)
        .byDate()
        .data.slice(0, screenWidth < 1064 ? 2 : 4);

    return (
        <>
            <Banner {...bannersData[0]} />
            <Layout>
                <Adds {...addsData[0]} />
            </Layout>
            {!!news?.length ? (
                <Layout mb={2} dt={4} title={'Последние новости пёселей'}>
                    <Carousel
                        data={news.map((el, i) => (
                            <News key={`news=${i}`} data={el} isTitled={true} />
                        ))}
                        cnt={screenWidth < 1064 ? 2 : 4}
                    />
                </Layout>
            ) : (
                <Preloader />
            )}
            {userId ? (
                <>
                    {!!newGoods.length && (
                        <Layout mb={2} dt={4} title='Наши новинки'>
                            {newGoods.map((el) => {
                                return <Card key={el._id} {...el} />;
                            })}
                        </Layout>
                    )}
                </>
            ) : (
                <Empty type='no-user' />
            )}

            <Layout dt={2}>
                <Adds {...addsData[getNumber(addsData.length)]} />
                <Adds {...addsData[getNumber(addsData.length)]} />
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

            {userId ? (
                <>
                    {!!products.length && (
                        // TODO: Сделать фильтрацию просмотренного
                        <Layout mb={2} dt={4} title='Недавно просмотренные'>
                            {products
                                .map((el) => {
                                    return <Card key={el._id} {...el} />;
                                })
                                .slice(0, screenWidth < 1064 ? 2 : 4)}
                        </Layout>
                    )}
                </>
            ) : (
                <Empty type='no-user' />
            )}

            <Layout>
                <Adds {...addsData[5]} />
            </Layout>
            {userId ? (
                <>
                    {!!favGoods.length && (
                        <Layout mb={2} dt={4} title='Популярные товары'>
                            {favGoods.map((el) => {
                                return <Card key={el._id} {...el} />;
                            })}
                        </Layout>
                    )}
                </>
            ) : (
                <Empty type='no-user' />
            )}
        </>
    );
};

export { Home };
