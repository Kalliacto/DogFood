import React from 'react';
import './Layout.css';

const Layout = ({
    mb = 1,
    dt = mb,
    gap = 'normal',
    children,
    title = false,
    top = false,
    fullHeight = false,
}) => {
    let className = 'layout';

    switch (mb) {
        case 2:
            className += ' layout_2';
            break;
        case 3:
            className += ' layout_3';
            break;
        case 4:
            className += ' layout_4';
            break;
        default:
            className += '';
    }

    switch (dt) {
        case 1:
            className += ' layout_dt-1';
            break;
        case 2:
            className += ' layout_dt-2';
            break;
        case 3:
            className += ' layout_dt-3';
            break;
        case 4:
            className += ' layout_dt-4';
            break;
        default:
            className += '';
    }

    switch (gap) {
        case 'none':
            className += ' layout_gap-none';
            break;
        case 'small':
            className += ' layout_gap-small';
            break;
        default:
            className += ' layout_gap-normal';
    }

    switch (top) {
        case 'top':
            className += ' layout_top';
            break;
        default:
            className += '';
    }

    if (fullHeight) {
        className += ' layout_h-100';
    }

    return (
        <div className={className}>
            {title && (
                <h2 className={`layout__title layout__title_${mb} layout__title_dt-${dt}`}>
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
};

export default Layout;
