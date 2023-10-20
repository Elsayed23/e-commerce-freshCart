import React from 'react';
import { Helmet } from 'react-helmet';

const Title = ({ title }) => {
    return (
        <Helmet title={`${title} | Fresh Cart Store`} />
    )
}

export default Title