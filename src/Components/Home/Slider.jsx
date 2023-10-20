import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';


const Slider = () => {

    const slideImagesData = [
        {
            id: 1,
            imgUrl: require("../../images/homeSlide1.jpeg")
        },
        {
            id: 2,
            imgUrl: require("../../images/homeSlide2.jpeg")
        },
        {
            id: 3,
            imgUrl: require("../../images/homeSlide3.jpeg")
        },
        {
            id: 4,
            imgUrl: require("../../images/homeSlide4.jpeg")
        },
        {
            id: 5,
            imgUrl: require("../../images/homeSlide5.jpeg")
        },
    ]



    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={25}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{
                bulletActiveClass: `bg-[#198754] opacity-100`,
                bulletClass: `swiper-pagination-bullet swiper-pagination-testClass`
            }}
            speed={700}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false
            }}
        >
            {slideImagesData.map((img) => {
                return (
                    <SwiperSlide key={img.id}>
                        <img src={img.imgUrl} className='h-[400px] cursor-grab active:cursor-grabbing rounded-sm w-full' alt="" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );
}

export default Slider;