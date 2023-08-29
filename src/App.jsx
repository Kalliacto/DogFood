import { Route, Routes } from 'react-router';
import './App.css';
import {
    About,
    AddProduct,
    Auth,
    Author,
    Basket,
    Delivery,
    Home,
    Products,
    Profile,
    SingleProduct,
    FAQ,
    NotFoundPage,
} from './pages';
import { NavLink } from 'react-router-dom';
import Layout from './components/Layout/Layout';

function App() {
    return (
        <>
            <Layout>
                <ul className='menu'>
                    <li>
                        <NavLink to={'/'}>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/products'}>Каталог</NavLink>
                        <ul>
                            <li>
                                <NavLink to={'/products/category/delicious'}>Лакомства</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/products/category/toys'}>Игрушки</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/products/favorites'}>Любимые товары</NavLink>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <NavLink to={'/product/ball'}>Мячик для собак</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/product/add'}>Добавить товар</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/basket'}>Корзина </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/profile'}>Профиль</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/auth'}>Войти</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/delivery'}>Доставка</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/about'}>О нас</NavLink>
                    </li>
                </ul>
            </Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/category/:name' element={<Products isCat={true} />} />
                <Route path='/products/favorites' element={<Products isFav={true} />} />
                <Route path='/product/:id' element={<SingleProduct />} />
                <Route path='/product/add' element={<AddProduct />} />
                <Route path='/basket' element={<Basket />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/provider/:id' element={<Author />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/delivery' element={<Delivery />} />
                <Route path='/about' element={<About />} />
                <Route path='/faq' element={<FAQ />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
