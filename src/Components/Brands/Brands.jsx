import React from 'react';
import Title from '../PageTitle';
import axios from 'axios';
import Card from './BrandCard';
import Loading from '../LoadingScreen/LoadingScreen';

const Brands = () => {

    const [allBrands, setAllBrands] = React.useState([]);
    const [loading, setLoading] = React.useState(true);



    async function getAllBrands() {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        setAllBrands(data.data);
        setLoading(false)
    }


    React.useEffect(() => {
        getAllBrands()
    }, [])

    let Cards = allBrands.map(card => {
        return (
            <Card key={card._id} {...card} />
        )
    })

    return (
        <div className='brands'>
            <Title title="Brands" />
            {
                loading
                    ?
                    <Loading />

                    :
                    <>
                        <h1 className='text-center text-5xl font-semibold mt-5 mb-6'>Our Brands</h1>
                        <div className="container px-4 py-8 mx-auto grid-cols-2 sm:grid-cols-3 grid lg:grid-cols-4 gap-x-5 gap-y-7">
                            {Cards}
                        </div>
                    </>
            }
        </div>
    )
}
export default Brands