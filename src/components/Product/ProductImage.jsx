import React from 'react';
import './index.css';

const ProductImage = ({ pictures, name }) => {
    return <img className='product__img' src={pictures} alt={name} />;
};

export default ProductImage;
