import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { MyContext } from '../CartContext/Context';
import { Outlet } from 'react-router-dom';

const Layout = ({ isLoggedIn, logOut, userName }) => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isFixed, setIsFixed] = React.useState(false);
    const { getProductsCount, getWishListCount } = React.useContext(MyContext)

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    React.useEffect(() => {
        getProductsCount()
        getWishListCount()
    }, [])

    window.addEventListener("scroll", () => {
        window.scrollY > 200 ? setIsFixed(prev => prev = true) : setIsFixed(prev => prev = !true)
    })


    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} logOut={logOut} userName={userName} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} isFixed={isFixed} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout