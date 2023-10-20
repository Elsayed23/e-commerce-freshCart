import React from 'react';
import Title from '../PageTitle';

const NotFoundData = () => {

    return (
        <>
            <Title title='Product is not avilable' />
            <img src={require('../../images/notFoundProduct.png')} className='mx-auto h-[calc(100vh-297.81px)]' alt="notFoundData" />
        </>
    )
}

export default NotFoundData;