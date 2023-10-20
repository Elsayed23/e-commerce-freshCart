import React from 'react';
import axios from 'axios';
import Loading from '../LoadingScreen/LoadingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { TERipple } from "tw-elements-react";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination'
import Title from '../PageTitle';
import { MyContext } from '../CartContext/Context';


const ProductDetails = () => {

    const [productDetails, setProductDetails] = React.useState(null)
    const [loading, setLoading] = React.useState(true);
    const [currImage, setCurrImage] = React.useState('')
    const { addToCart } = React.useContext(MyContext)

    const { id } = useParams()

    async function getProDetails() {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        const { images } = data.data
        setCurrImage(images[0]);
        setProductDetails(data.data);
        setLoading(false)
    }

    React.useEffect(() => {
        getProDetails()
    }, [])



    const sliderImgs = productDetails?.images.map((img, idx) => {
        return (
            <SwiperSlide key={idx} >
                <img src={img} className='w-full h-96 object-fill rounded-lg' alt="" />
            </SwiperSlide>
        )
    })


    return (

        loading
            ?
            <Loading />
            :
            <div className="sm:container t py-16 px-4 mx-auto flex flex-col items-center gap-16">
                <Title title='Details' />
                <div className="w-full sm:w-96">
                    <Swiper
                        className='overflow-x-hidden'
                        modules={[Pagination, Navigation]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{
                            clickable: true,
                            bulletActiveClass: `bg-[#198754] opacity-100`,
                            bulletClass: `swiper-pagination-bullet swiper-pagination-testClass`
                        }}
                    >
                        {sliderImgs}
                    </Swiper>
                </div>
                <div className="flex flex-col">
                    <h4 className='font-bold mb-4 text-[#198754]'>{productDetails.title}</h4>
                    <h1 className='text-md leading-6 mb-1'>{productDetails.description}</h1>
                    <div className="flex gap-3 mb-5 items-center">
                        <div className="stars">
                            <FontAwesomeIcon icon={faStar} className='text-sm' color='#ffc908' />
                            <FontAwesomeIcon icon={faStar} className='text-sm' color='#ffc908' />
                            <FontAwesomeIcon icon={faStar} className='text-sm' color='#ffc908' />
                            <FontAwesomeIcon icon={faStar} className='text-sm' color='#ffc908' />
                            <FontAwesomeIcon icon={faStar} className='text-sm' color='#ffc908' />
                        </div>
                        <h3 className='font-semibold text-sm text-[#198754]'>{`(${productDetails.ratingsQuantity} reviews)`}</h3>
                    </div>
                    <div className="flex gap-3 mb-5">
                        <h6 className={`${productDetails.priceAfterDiscount ? 'text-red-600 line-through' : 'text-[#198754]'} font-bold`}>{productDetails.price} {productDetails.priceAfterDiscount ? '' : 'EGP'}</h6>
                        {productDetails.priceAfterDiscount && <h5 className='font-bold text-[#198754]'>{productDetails.priceAfterDiscount} EGP</h5>}
                    </div>
                    <TERipple rippleColor="light">
                        <button
                            onClick={() => { addToCart(id) }}
                            type="button"
                            className="inline-block -tracking-tighter rounded bg-[#198754] px-5 pb-2 pt-2.5 text-sm leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring- active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                            <FontAwesomeIcon icon={faBagShopping} className='text-sm mr-2' />
                            Add to Card
                        </button>
                    </TERipple>
                </div>
            </div>
    )
}

export default ProductDetails;