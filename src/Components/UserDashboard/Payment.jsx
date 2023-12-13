import React from 'react';
import { Helmet } from 'react-helmet-async';
import Lottie from "lottie-react";
import Animation from '../../assets/animation/payment-animation.json';
import SectionTilte from '../SharedComponent/SectionTilte';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import bkash from '../../assets/images/payment/bkash.png';
import nagad from '../../assets/images/payment/nagad.png';
import roket from '../../assets/images/payment/rocket.png';
import visa from '../../assets/images/payment/visa.png';
import mastercard from '../../assets/images/payment/card.png';
import aex from '../../assets/images/payment/american-express.png';
import diner from '../../assets/images/payment/diners-club.png';
import union from '../../assets/images/payment/unionpay.png';
import discover from '../../assets/images/payment/discover.png';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PUBLISH_K);


const Payment = () => {

    return (
        <>
            <Helmet><title>Payment | Masuk's Kitchen Restaurant</title></Helmet>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div className='lg:h-screen flex items-center justify-center'>
                    <Lottie animationData={Animation} loop={true} />
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-center mx-auto mt-10 border-y-2 p-2 w-5/12'>Payment</h1>
                    <p className='text-center my-5'>"Seize the moment and savor your Food, just one click away from bringing joy to your doorstep!"</p>
                    {/* Payment Element Here from PaymentFrom  */}
                    <div className='p-2 w-11/12 mx-auto mt-6 mb-6 lg:mb-10'>
                        <h3 className='mb-5 text-center font-semibold'>Card Payment</h3>
                        <Elements stripe={stripePromise}>
                            <PaymentForm></PaymentForm>
                        </Elements>
                    </div>
                    <div className='flex items-center gap-2 md:gap-4 justify-center'>
                        <h3 className='font-medium'>We Accept </h3>
                        <div className='flex justify-evenly gap-3'>
                            <img className='w-7 md:w-10' src={visa} alt="" />
                            <img className='w-7 md:w-10' src={mastercard} alt="" />
                            <img className='w-7 md:w-10' src={union} alt="" />
                            <img className='w-7 md:w-10' src={aex} alt="" />
                            <img className='w-7 md:w-10' src={diner} alt="" />
                            <img className='w-7 md:w-10' src={discover} alt="" />
                        </div>
                    </div>
                    <div className="divider">OR</div>
                    {/* TODO:: Apply MFS  */}
                    <div>
                        <p className='font-medium'>Continue With</p>
                        <div className='flex items-center flex-col lg:flex-row gap-5 justify-between'>
                            <img className='p-3 shadow-lg cursor-pointer hover:scale-105 rounded-md transition duration-150' src={bkash} alt="" />
                            <img className='p-3 shadow-lg cursor-pointer hover:scale-105 rounded-md transition duration-150' src={nagad} alt="" />
                            <img className='p-3 shadow-lg cursor-pointer hover:scale-105 rounded-md transition duration-150 w-2/6' src={roket} alt="" />
                        </div>
                    </div>
                    <p className='text-center mt-10'>Read Our Privacy Policy <Link className='text-blue-500 underline' to=''>Here</Link>!</p>
                </div>
            </div>
        </>
    );
};

export default Payment;