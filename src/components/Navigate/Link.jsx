import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Context } from '../../context/context';
import './Navigate.css';

const LinkItem = ({ path, position, as, children }) => {
    return (
        <>
            {as === 'link' && (
                <RouterLink to={path} className={`nav__link nav__link_${position}`}>
                    {children}
                </RouterLink>
            )}
            {as === 'a' && (
                <a
                    className={`nav__link nav__link_${position}`}
                    href={path}
                    target='_blank'
                    rel='noreferrer'
                >
                    {children}
                </a>
            )}
        </>
    );
};

const Link = ({
    path,
    title = '',
    position = 'horizontal',
    imgType = '',
    imgPath,
    children,
    visibility = 'all',
    as = 'link',
    caption = false,
}) => {
    const { userId } = useContext(Context);

    return (
        <>
            {(visibility === 'all' ||
                (visibility === 'user' && userId) ||
                (visibility === 'no-user' && !userId)) && (
                <div className={`nav__item ${caption ? 'nav__item_caption' : ''}`}>
                    <LinkItem as={as} position={position} path={path}>
                        {imgType === 'image' && (
                            <img className='nav__image' src={imgPath} alt={title} />
                        )}
                        {imgType === 'icon' && <i className={`nav__icon ${imgPath}`} />}
                        {title && title}
                    </LinkItem>
                    {children}
                </div>
            )}
        </>
    );
};

export default Link;
