import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import BrandsDetails from './Components/Brands/BrandsDetails';
import Cart from './Components/Cart/Cart'
import jwtDecode from 'jwt-decode';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import WishList from './Components/WishList/WishList';
import Context from './Components/CartContext/Context';
import { Toaster } from 'react-hot-toast';


const App = () => {



  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userName, setUserName] = React.useState('')

  function getUserData() {

    jwtDecode(localStorage.getItem("token"))

    setIsLoggedIn(true)
    setUserName(jwtDecode(localStorage.getItem("token")).name)

  }


  React.useEffect(() => {

    if (localStorage.getItem("token") !== null && isLoggedIn === false) {
      getUserData()
    }

  }, [])

  function logOut() {

    localStorage.removeItem("token");
    setIsLoggedIn(false)
    setUserName("")
  }


  const router = createHashRouter(

    [
      {
        path: "", element: <Layout isLoggedIn={isLoggedIn} logOut={logOut} userName={userName} />, children: [
          { path: "", element: <Home isLoggedIn={isLoggedIn} /> },
          { path: "home", element: <Home isLoggedIn={isLoggedIn} /> },
          { path: "brands", element: <Brands /> },
          { path: "brandsDetails/:id", element: <BrandsDetails isLoggedIn={isLoggedIn} /> },
          { path: "register", element: <Register /> },
          { path: "login", element: <Login getUserData={getUserData} /> },
          { path: "productDetails/:id", element: <ProductDetails /> },
          { path: "cart", element: <Cart userName={userName} /> },
          { path: "wishList", element: <WishList userName={userName} /> },
        ]
      },
      { path: "*", element: <NotFoundPage /> }
    ])

  return (
    <Context>
      <Toaster position='top-center' />
      <RouterProvider router={router} />
    </Context>
  )
}

export default App