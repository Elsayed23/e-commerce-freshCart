import React from 'react';
import Title from '../PageTitle';
import Card from '../ProductCard';
import axios from 'axios';
import Loading from '../LoadingScreen/LoadingScreen'
import { Toaster } from 'react-hot-toast';
import Intro from './Intro';
import Categories from './Categories';



const Home = ({ isLoggedIn }) => {

    const [allProduct, setAllProduct] = React.useState(null)
    const [loading, setLoading] = React.useState(true);
    const [categoryName, setCategoryName] = React.useState('all')
    const [categoryId, setCategoryId] = React.useState(null)

    const handleChange = (e) => {
        setCategoryName(e)
    }

    React.useEffect(() => {
        if (categoryName === "all") {
            setCategoryId(null)
        } else if (categoryName === "men's") {
            setCategoryId("6439d5b90049ad0b52b90048")
        } else if (categoryName === "women's") {
            setCategoryId("6439d58a0049ad0b52b9003f")
        } else if (categoryName === "electronics") {
            setCategoryId("6439d2d167d9aa4ca970649f")
        }
    }, [categoryName])


    async function getAllProduct() {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
            params: {
                category: categoryId
            }
        })
        setAllProduct(data.data);
        setLoading(false)
    }



    React.useEffect(() => {
        getAllProduct()
    }, [categoryId])


    let cards = allProduct?.map((card) => {
        return (
            <Card key={card.id} isLoggedIn={isLoggedIn} {...card} />
        )
    })

    return (
        <>
            <Title title='Home' />
            {
                loading ?
                    <Loading />
                    :
                    <div className="home">
                        <Toaster position='top-center' />
                        <Intro />
                        <div className='container px-3 mx-auto py-14'>
                            <h1 className='text-center text-5xl font-black mb-8'>Our Products</h1>
                            <Categories category={categoryName} handleChange={handleChange} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7">
                                {cards}
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Home