import React from 'react';
import './News.css';

const News = ({ data, isTitled = false }) => {
    return (
        <div className='news_container'>
            <a target='_blank' href={data.url} rel='noreferrer' className='news'>
                <img src={data.urlToImage} alt={data.title} className='news__img' />
            </a>
            <span className='news__content'>
                {isTitled && <span className='news__title'>{data.title}</span>}
                <span className='news__date'>
                    {new Date(data.publishedAt).toLocaleDateString()}
                </span>
            </span>
        </div>
    );
};

export default News;
