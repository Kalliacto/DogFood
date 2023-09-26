import React from 'react';
import './Footer.css';
import menu from '../../assets/data/menu.json';
import Layout from '../Layout/Layout';
import Navigate from '../Navigate/Navigate';
import Logo from '../Logo/Logo';
import useResize from '../../hooks/useResize';

const Footer = (props) => {
    const screenWidth = useResize(window.innerWidth);

    return (
        <footer className='footer'>
            <Layout dt={3}>
                <div className='footer__sign'>
                    <Logo position='vertical' />
                    <div className='footer__text'>
                        <span>
                            Made with love <i className='lni lni-heart' />{' '}
                            <a href={'https://github.com/Kalliacto'} target='_blank'>
                                Kalliacto
                            </a>
                        </span>
                        <span> ©{new Date().getFullYear()}</span>
                    </div>
                </div>
                <div className='footer__menu'>
                    <Navigate menu={menu.footer} position='vertical' />
                </div>
                <hr className='footer__separator' />
                <Navigate menu={menu.links_1} position='vertical' />
                <Navigate menu={menu.links_2} position='vertical' />
                <Navigate menu={menu.links_3} position='vertical' />
            </Layout>
        </footer>
    );
};

export default Footer;
