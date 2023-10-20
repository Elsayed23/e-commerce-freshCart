import React, { createContext } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';



export const MyContext = createContext()


const Context = ({ children }) => {

    const [getUserCart, setGetUserCart] = React.useState([])
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [productsCount, setProductsCount] = React.useState(0)
    const [wishListCount, setWishListCount] = React.useState(0)
    const [loading, setLoading] = React.useState(true);
    const [getWishList, setGetWishList] = React.useState(null)



    // Get And Delet Cart
    async function getCart() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            const { numOfCartItems } = data
            const { totalCartPrice, products } = data.data
            setTotalPrice(totalCartPrice)
            setLoading(false);
            setProductsCount(numOfCartItems)
            setGetUserCart(products)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    async function getProductsCount() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            const { numOfCartItems } = data
            setProductsCount(numOfCartItems)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    async function Delete(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            const { totalCartPrice, products } = data.data
            const { numOfCartItems } = data
            toast.success('Product removed successfully from your cart', {
                position: 'top-center',
                className: 'shadow-none text-[#198754] w-full'
            })
            setTotalPrice(totalCartPrice)
            setProductsCount(numOfCartItems)
            setGetUserCart(products)
        } catch (error) {
            console.log(error);
        }
    }

    // Add And Remove From WishList
    async function WishList() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setLoading(false)
            setWishListCount(data.count)
            setGetWishList(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function getWishListCount() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setWishListCount(data.count)
        } catch (error) {
            console.log(error);
        }
    }
    async function addToWishList(id) {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                "productId": id
            }, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            setWishListCount(data.data.length);
            toast.success(data.message, {
                position: 'top-center',
                className: 'shadow-none text-[#198754] w-full'
            })

        } catch (error) {
            console.log(error);
        }
    }
    async function removeFromWishList(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            toast.remove(data.message, {
                position: 'top-center',
                className: 'shadow-none text-[#198754] w-full'
            })
            setWishListCount(data.data.length);
            let newItems = data.data.map((e) =>
                getWishList.filter((id) => e === id.id)
            ).map((e) => {
                return e[0]
            })

            setGetWishList(newItems)

            toast.error(data.message, {
                position: 'top-center',
                className: 'shadow-none text-[red] w-full'
            })

        } catch (error) {
            console.log(error);
        }
    }

    // Add To Cart
    async function addToCart(id) {

        try {
            const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/cart',
                {
                    "productId": id
                },
                {
                    headers: {
                        'token': localStorage.getItem("token")
                    }
                }
            )
            const { numOfCartItems } = data
            setProductsCount(numOfCartItems)
            toast.success(data.message, {
                className: 'shadow-none text-[#198754] w-full',
                duration: 2000
            })

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                className: 'shadow-none text-[red] w-full',
                duration: 2000
            })
        }

    }

    return (
        <MyContext.Provider value={{
            getUserCart, totalPrice, productsCount, setGetUserCart, setTotalPrice, loading, Delete, getCart, addToWishList, removeFromWishList,
            addToCart, getProductsCount, wishListCount, WishList, getWishList, setWishListCount, getWishListCount, setProductsCount
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default Context