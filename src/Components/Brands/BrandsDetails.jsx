import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Title from '../PageTitle';
import Loading from '../LoadingScreen/LoadingScreen';
import CardDetails from '../ProductCard'
import NotFoundData from './NotFoundData';



const BrandsDetails = ({ isLoggedIn }) => {


    const [details, setDetails] = React.useState(null)
    const [isNotFoundData, setIsNotFoundData] = React.useState({})
    const [loading, setLoading] = React.useState(true);

    const { id } = useParams()

    async function getBrandsDetails() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
                params: {
                    brand: id
                }
            })
            setDetails(data.data)
            setIsNotFoundData(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getBrandsDetails()
    }, [])

    const brandDetails = details?.map(item => {
        return (
            <CardDetails key={item.id} isLoggedIn={isLoggedIn}  {...item} />
        )
    })

    return (
        isNotFoundData.results !== 0 ?
            loading
                ?
                <Loading />
                :
                <>
                    <Title title={details.length > 0 && details[0]?.brand.name} />
                    <h1 className='text-center text-5xl font-semibold mt-5 mb-6'>{details[0]?.brand.name}</h1>
                    <div className="container px-4 py-8 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7">
                        {brandDetails}
                    </div>
                </>
            : <NotFoundData />
    )
}

export default BrandsDetails;