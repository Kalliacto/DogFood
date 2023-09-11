import React from 'react';
import './Banner.css';
import { Banners as BannersImg } from '../../assets/img';
import Layout from '../Layout/Layout';

const Banner = ({ text, bg, title = 'DoogFood', main = true }) => {
    const bannerStyle = {
        backgroundImage: `url(${BannersImg[bg]})`,
    };

    return (
        <div className='banner' style={bannerStyle}>
            <Layout gap='small'>
                {main ? (
                    <h1 className='banner__title'>{title}</h1>
                ) : (
                    <h2 className='banner__title'>{title}</h2>
                )}
                <div className='banner__text'>{text}</div>
            </Layout>
        </div>
    );
};

export default Banner;
