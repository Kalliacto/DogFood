import React from 'react';
import { useParams } from 'react-router';

const Products = ({ isFav = false, isCat = false }) => {
    const { name } = useParams();
    console.log(name);
    return (
        <div>
            {isFav && <p>Любимые товары</p>}
            {isCat && <p>Страница категории '{name}'</p>}
            {!isCat && !isCat && <p>Страница товаров</p>}
        </div>
    );
};

export { Products };
