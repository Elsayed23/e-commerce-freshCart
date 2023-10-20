import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, name, _id }) => {

    return (
        <Link to={`/brandsDetails/${_id}`} className="text-center shadow-lg bg-white rounded-md pb-4">
            <img src={image} className='w-full mb-3' alt={name} />
            <h1 className='font-semibold text-lg'>{name}</h1>
        </Link>
    )
}

export default Card;