import { RotatingLines } from 'react-loader-spinner';

import React from 'react';

const Preloader = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <RotatingLines
                strokeColor='#ffd657'
                strokeWidth='5'
                animationDuration='0.75'
                width='140'
                visible={true}
            />
        </div>
    );
};

export default Preloader;
