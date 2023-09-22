import React from 'react';
import './Logo.css';
import Link from '../Navigate/Link';
import { Corgi } from '../../assets/img/index';

const Logo = ({ position = 'horizontal' }) => {
    return (
        <div className='logo'>
            <Link
                path={'/'}
                position={position}
                imgType='image'
                imgPath={Corgi.logo}
                title='DogFood'
            ></Link>
        </div>
    );
};

export default Logo;
