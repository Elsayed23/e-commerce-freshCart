import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { MyContext } from './CartContext/Context';




const ProCard = ({ imageCover, id, category: { name }, title, quantity, price, priceAfterDiscount, ratingsAverage, isLoggedIn }) => {

    const [heart, setHeart] = React.useState(true)


    const { addToWishList, removeFromWishList } = useContext(MyContext)


    function addTWishList() {
        setHeart(false)
        addToWishList(id)

    }

    function removeFWishList() {
        setHeart(true)
        removeFromWishList(id)
    }


    return (
        <Card className="card relative group bg-blue-gray-50 duration-500">
            {
                isLoggedIn
                    ?
                    heart
                        ?

                        <div className='absolute z-40 left-6 top-6 cursor-pointer'>
                            <svg id="heart" className={`heart w-[30px] h-[30px]`} onClick={addTWishList} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke='currentColor' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M20.84 4.37a5.5 5.5 0 0 0-7.78 0L12 5.16l-1.06-.79a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.37a5.5 5.5 0 0 0 0-7.78z">
                                </path>
                            </svg>
                        </div>
                        :
                        <div className='absolute z-40 left-6 top-6 cursor-pointer'>
                            <svg id="heart" className={`heart fill-[red] w-[30px] h-[30px]`} onClick={removeFWishList} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke='red' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M20.84 4.37a5.5 5.5 0 0 0-7.78 0L12 5.16l-1.06-.79a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.37a5.5 5.5 0 0 0 0-7.78z">
                                </path>
                            </svg>
                        </div>
                    :
                    <>
                    </>

            }

            <CardHeader shadow={false} floated={false} className=" h-80 overflow-hidden rounded-xl">
                <img src={imageCover} className='w-full h-full group-hover:scale-[1.2] duration-500 object-fill scale-x-[1.1] lg:scale-[1.1]' alt="" />
            </CardHeader>
            <CardBody>
                <h5 className='font-bold absolute top-2 rounded-full right-2  text-white p-2 w-[40px] text-center bg-[#198754]'>{ratingsAverage.toString().includes('.') ? ratingsAverage : `${ratingsAverage}.0`}</h5>
                <h4 className='font-semibold mb-2 noWrapeTitle text-sm text-blue-gray-600 text-ellipsis overflow-hidden w-full'>{title}</h4>
                <h3 className='mb-2'>{name}</h3>
                <div className="flex gap-3 mb-3">
                    <h5 className={`${priceAfterDiscount ? 'text-red-600 line-through' : 'text-[#198754]'} text-sm font-bold`}>{price} {priceAfterDiscount ? '' : 'EGP'}</h5>
                    {priceAfterDiscount > 0 && <h5 className='font-bold text-[#198754] text-sm'>{priceAfterDiscount} EGP</h5>}
                </div>
            </CardBody>
            <Link to={`/productDetails/${id}`}>
                <CardFooter className='pt-0'>
                    <Button
                        ripple={false}
                        fullWidth={true}
                        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 duration-500"
                    >
                        show details
                    </Button>
                </CardFooter>
            </Link>

        </Card>
    )

}

export default ProCard;