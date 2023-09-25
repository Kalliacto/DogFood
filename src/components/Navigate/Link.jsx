import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Context } from '../../context/context';
import './Navigate.css';

const Link = ({
    path,
    title = '',
    position = 'horizontal',
    imgType = '',
    imgPath,
    children,
    visibility = 'all',
}) => {
    const { userId } = useContext(Context);

    return (
        <>
            {(visibility === 'all' ||
                (visibility === 'user' && userId) ||
                (visibility === 'no-user' && !userId)) && (
                <div className='nav__item'>
                    <RouterLink to={path} className={`nav__link nav__link_${position}`}>
                        {imgType === 'image' && (
                            <img className='nav__image' src={imgPath} alt={title} />
                        )}
                        {imgType === 'icon' && <i className={`nav__icon ${imgPath}`} />}
                        {title && title}
                    </RouterLink>
                    {children}
                </div>
            )}
        </>
    );
};

export default Link;
