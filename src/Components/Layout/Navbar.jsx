import React from 'react';
import logo from '../../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../CartContext/Context';
import { Badge, IconButton } from '@material-tailwind/react';
import './navbar.css'



const Navbar = ({ isLoggedIn, logOut, userName }) => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isFixed, setIsFixed] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    window.addEventListener("scroll", () => {
        window.scrollY > 200 ? setIsFixed(prev => prev = true) : setIsFixed(prev => prev = !true)
    })

    const navigate = useNavigate()
    const { productsCount, wishListCount } = React.useContext(MyContext)

    return (
        <nav className={`bg-[#eee] w-full ${isFixed ? 'fixedHeader' : 'absolute'}  top-0 z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-5">
                            <div className="flex-shrink-0">
                                <img src={logo} alt="Logo" />
                            </div>
                            {
                                isLoggedIn
                                    ?
                                    <div className='hidden gap-8 md:flex items-center'>
                                        <Link to='/cart' className=''>
                                            <Badge content={productsCount}>
                                                <IconButton className='rounded-full bg-[#198754]'>
                                                    <FontAwesomeIcon size='lg' icon={faCartArrowDown} />
                                                </IconButton >
                                            </Badge>
                                        </Link>
                                        <Link to='/wishList'>
                                            <Badge content={wishListCount}>
                                                <IconButton className='rounded-full bg-[#198754]'>
                                                    <FontAwesomeIcon size='lg' icon={faHeart} />
                                                </IconButton>
                                            </Badge>
                                        </Link>

                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-baseline gap-6">
                                <div className="links flex gap-4">
                                    <Link
                                        to='home' className="text-slate-800 font-semibold hover:text-[#198754] duration-200 px-1 py-2 rounded-md text-sm">Home</Link>
                                    <Link
                                        to='brands'
                                        className="text-slate-800 font-semibold hover:text-[#198754] duration-200 px-1 py-2 rounded-md text-sm"
                                    >
                                        Brands
                                    </Link>
                                </div>
                                <div className="log flex items-center gap-3 relative before:w-[2px] before:bg-slate-800 before:absolute before:-left-[.85rem] before:h-full">
                                    {
                                        isLoggedIn
                                            ?
                                            <>
                                                <h1 className='font-bold hover:text-[#198754] cursor-pointer' onClick={() => { logOut(); navigate('/login') }}>LogOut</h1>
                                                <h1 className='font-bold'>{userName}</h1>
                                            </>
                                            :
                                            <>

                                                <Link to='login' className='block font-bold hover:text-[#198754]'>
                                                    Login
                                                </Link>
                                                <Link to='register' className='block font-bold hover:text-[#198754]'>
                                                    Register
                                                </Link>
                                            </>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <input type="checkbox" id="checkbox" className='hidden' onClick={toggleMenu} />
                        <label htmlFor="checkbox" className="toggle relative w-[40px] h-[40px] cursor-pointer flex flex-col items-center justify-center gap-[10px] duration-300">
                            <div className={`bars ${isMenuOpen ? `ml-[13px]` : ``} w-full h-[4px] bg-[#198754] rounded-[5px] duration-300`} id="bar1"></div>
                            <div className={`bars ${isMenuOpen ? `ml-[13px]` : ``} w-full h-[4px] bg-[#198754] rounded-[5px] duration-300`} id="bar2"></div>
                            <div className={`bars ${isMenuOpen ? `ml-[13px]` : ``} w-full h-[4px] bg-[#198754] rounded-[5px] duration-300`} id="bar3"></div>
                        </label>
                    </div>
                </div>
            </div>
            {/* Mobile menu, show/hide based on menu state */}
            <div className={`md:hidden ${isMenuOpen ? isLoggedIn ? 'h-[300px]' : 'h-[220px]' : 'h-0'} overflow-hidden duration-300`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 sm:px-3">
                    <Link
                        to='home'
                        className="text-[#198754] duration-200 block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to='brands'
                        className="text-[#198754] duration-200 block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Brands
                    </Link>
                    {
                        isLoggedIn
                            ?
                            <>
                                <h1 className='font-bold text-[#198754] duration-200 block px-3 py-2 rounded-md text-base cursor-pointer' onClick={() => { logOut(); navigate('/login') }}>LogOut</h1>
                                <h1 className='font-bold text-[#198754] duration-200 block px-3 py-2 rounded-md text-base'>user: {userName}</h1>
                                <Link to='/cart' className='font-bold flex justify-between text-[#198754] duration-200 px-3 py-2 rounded-md text-base'>
                                    My Cart
                                    <h3>{productsCount} {productsCount > 1 ? 'items' : 'item'}</h3>
                                </Link>
                                <Link to='/wishList' className='font-bold flex justify-between text-[#198754] duration-200 px-3 py-2 rounded-md text-base'>
                                    My WishList
                                    <h3>{wishListCount} {wishListCount > 1 ? 'items' : 'item'}</h3>
                                </Link>

                            </>
                            :
                            <>

                                <Link to='login' className='block text-[#198754] font-bold px-3 py-2 rounded-md text-base'>
                                    Login
                                </Link>
                                <Link to='register' className='block text-[#198754] font-bold px-3 py-2 rounded-md text-base'>
                                    Register
                                </Link>
                            </>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar