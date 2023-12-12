import React from 'react';
import { Helmet } from 'react-helmet-async';
import Lottie from "lottie-react";
import Animation from '../../assets/animation/payment-animation.json';
import SectionTilte from '../SharedComponent/SectionTilte';

const Payment = () => {
    return (
        <>
            <Helmet><title>Payment | Masuk's Kitchen Restaurant</title></Helmet>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='md:h-screen flex items-center justify-center'>
                    <Lottie animationData={Animation} loop={true} />;
                </div>
                <div>
                    <SectionTilte subheading={'-- Checkout --'} heading={'Payment'}></SectionTilte>

                </div>
            </div>
        </>
    );
};

export default Payment;