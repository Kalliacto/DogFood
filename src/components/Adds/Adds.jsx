import React from 'react';
import './Adds.css';
import { Corgi } from '../../assets/img';
import { Link } from 'react-router-dom';

const Adds = ({ name, tag, img, text }) => {
    const imgStyle = {
        backgroundImage: `url(${Corgi[img]})`,
    };

    return (
        <div className='adds'>
            <div className='adds__text'>
                <h3>{name}</h3>
                <p>{text}</p>
                <Link to={`/products/category/${tag}`}>Подробнее</Link>
            </div>
            <div className='adds__img' style={imgStyle} />
        </div>
    );
};

export default Adds;
