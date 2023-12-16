import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTilte from '../SharedComponent/SectionTilte';

const OrderHistory = () => {
    return (
        <>
            <Helmet><title>Orders | Masuk's Kitchen Restaurant</title></Helmet>
            <SectionTilte subheading={"-- Order List --"} heading={'Just Caught Up Here'}></SectionTilte>
        </>
    );
};

export default OrderHistory;