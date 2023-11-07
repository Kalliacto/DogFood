import React, { useState } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigate from '../Navigate/Navigate';
import Search from '../Forms/Search';
import menu from '../../assets/data/menu.json';
import Layout from '../Layout/Layout';
import useResize from '../../hooks/useResize';

const Header = (props) => {
    const screenWidth = useResize(window.innerWidth);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className='header'>
            <Layout>
                <Logo />
                <Search type='main' />
                {screenWidth < 1064 ? (
                    <>
                        <button
                            className={`card__btn header__btn ${
                                showMenu ? 'header__btn_active' : ''
                            }`}
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <i className='lni lni-menu' />
                        </button>
                        <Navigate menu={menu.header} position='vertical' />
                    </>
                ) : (
                    <Navigate menu={menu.header} />
                )}
            </Layout>
        </header>
    );
};

export default Header;
