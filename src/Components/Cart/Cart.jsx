import React, { useContext } from 'react';
import axios from 'axios';
import Card from './CartCard'
import Title from '../PageTitle';
import { TERipple } from "tw-elements-react";
import Loading from '../LoadingScreen/LoadingScreen';
import { MyContext } from '../CartContext/Context';

const Cart = ({ userName }) => {

    const { getCart, getUserCart, totalPrice, productsCount, setGetUserCart, setTotalPrice, setProductsCount, loading, Delete } = useContext(MyContext)



    async function Clear() {
        await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        setTotalPrice(0)
        setProductsCount(0)
        setGetUserCart([])
    }



    let Cart = getUserCart.map((item, idx) => {
        return (
            <Card key={idx}  {...item.product} Delete={Delete} {...item} />
        )
    })

    React.useEffect(() => {
        getCart()
    }, [])

    return (
        <>
            <Title title='Cart' />
            {
                loading
                    ?
                    <Loading />
                    :
                    <div className="container mx-auto py-8 px-4">
                        <h1 className='text-2xl md:text-4xl font-semibold mb-8 text-center'>Welcome {userName} in your Cart {totalPrice === 0 && <span className='text-sm'>(is empty)</span>}</h1>
                        <div className="flex mb-5 justify-center md:justify-between items-center">
                            <img src={require('../../images/cartImg.png')} className=' hidden md:block w-72' alt="cart" />
                            <div className='py-7 px-8 border rounded-sm border-[#198754]'>
                                <h2 className='text-center mb-7 text-3xl font-semibold'>Orders</h2>
                                <h3 className='mb-2 font-semibold'>Products: {productsCount} {productsCount === 1 ? "item" : "items"}</h3>
                                <h3 className='font-semibold'>TotalPrice: {totalPrice} EGP</h3>
                            </div>
                        </div>
                        <div className='flex justify-center md:justify-end mb-5'>
                            <TERipple>
                                <button
                                    onClick={Clear}
                                    type="button"
                                    className="font-semibold rounded border-2 border-danger px-6 pb-[6px] pt-2 text-lg uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                >
                                    Clear Cart
                                </button>
                            </TERipple>

                        </div>
                        <div className="flex flex-col gap-3">
                            {Cart}
                        </div>
                    </div>
            }
        </>
    )
}

export default Cart;