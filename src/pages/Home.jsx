import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import bannersData from '../assets/data/banners.json';
import addsData from '../assets/data/adds.json';
import Banner from '../components/Banner/Banner';
import Adds from '../components/Adds/Adds';
import { useSelector } from 'react-redux';
import News from '../components/News/News';
import Carousel from '../components/Carousel/Carousel';
import Preloader from '../components/Preloader/Preloader';

const Home = () => {
    const { news, newsLenta, staticNews, staticNewsLenta } = useSelector((s) => s.news);
    const [mainNews, setMainNews] = useState([]);
    const [mainNewsLenta, setMainNewsLenta] = useState([]);

    console.log('mainNews', mainNews);
    console.log('mainNewsLenta', mainNewsLenta);

    useEffect(() => {
        !!news?.length ? setMainNews(news) : setMainNews(staticNews);
        !!newsLenta?.length ? setMainNewsLenta(newsLenta) : setMainNewsLenta(staticNewsLenta);
    }, [news, newsLenta]);

    return (
        <>
            <Banner {...bannersData[0]} />
            <Layout>
                <Adds {...addsData[0]} />
            </Layout>
            {console.log('mainNews?.length', !!mainNews?.length)}
            {!!mainNews?.length ? (
                <Layout mb={2} dt={4} title={'Последние новости о пёселях'}>
                    <Carousel
                        data={mainNews.map((el, i) => (
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
            {!!mainNewsLenta?.length ? (
                <Layout mb={1} dt={2} title={'Новосте пёселей Lenta.ru'}>
                    <Carousel
                        data={mainNewsLenta.map((el, i) => (
                            <News key={`news=${i}`} data={el} />
                        ))}
                        cnt={window.innerWidth < 1064 ? 1 : 2}
                    />
                </Layout>
            ) : (
                <Preloader />
            )}
        </>
    );
};

export { Home };
