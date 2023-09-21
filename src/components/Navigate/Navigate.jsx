import React from 'react';
import './Navigate.css';
import Link from './Link';

const Navigate = ({ menu, position = 'horizontal' }) => {
    return (
        <nav className={`nav nav_${position}`}>
            {menu.map((el, i) => (
                <Link key={i} {...el}>
                    {el.subLinks && (
                        <div className='nav nav_submenu nav_vertical'>
                            {el.subLinks.map((link, j) => (
                                <Link key={j} {...link} />
                            ))}
                        </div>
                    )}
                </Link>
            ))}
        </nav>
    );
};

export { Link };
export default Navigate;
