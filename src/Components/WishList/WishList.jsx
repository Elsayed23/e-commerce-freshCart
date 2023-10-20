import React from 'react';
import Card from './WishListCard';
import { Toaster } from 'react-hot-toast';
import Loading from '../LoadingScreen/LoadingScreen';
import Title from '../PageTitle';
import { MyContext } from '../CartContext/Context';

const WishList = ({ userName }) => {

    const { loading, WishList, removeFromWishList, getWishList, wishListCount, setWishListCount } = React.useContext(MyContext)

    React.useEffect(() => {
        WishList()
    }, [])

    React.useEffect(() => {
        setWishListCount(getWishList?.length)
    }, [getWishList])

    const card = getWishList?.map((card, idx) => {
        return (
            <Card key={idx} removeFromWishList={removeFromWishList} {...card} />
        )
    })


    return (
        <>
            <Title title='WishList' />
            {
                loading
                    ?
                    <Loading />
                    :
                    <div className="container mx-auto py-8 px-4">
                        <Toaster position='top-center' />
                        <h1 className={`${wishListCount ? 'mb-5' : 'mb-16'} text-2xl md:text-4xl font-semibold text-center`}>Welcome ({userName}) in your WishList {wishListCount === 0 && <span className='text-sm'>(is empty)</span>}</h1>
                        {getWishList?.length > 0 && <h2 className='mb-16 text-xl md:text-3xl font-semibold text-center'>Count: {wishListCount} {wishListCount > 1 ? 'items' : 'item'}</h2>}
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7'>
                            {card}
                        </div>
                    </div>
            }
        </>
    )
}

export default WishList;