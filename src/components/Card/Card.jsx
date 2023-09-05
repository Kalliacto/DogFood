import React from 'react';
import './Card.css';

const Card = ({ ...props }) => {
    const {
        name,
        created_at,
        description,
        discount,
        likes,
        pictures,
        price,
        reviews,
        stock,
        tags,
        wight,
        _id,
    } = { ...props };

    return <div className='card'></div>;
};

export default Card;
