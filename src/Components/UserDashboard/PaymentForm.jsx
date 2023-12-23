import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import { Authcontext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ price, cartItem }) => {
    const { user } = useContext(Authcontext);
    const stripe = useStripe();
    const elements = useElements();
    const [showCardError, setshowCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosInterceptor();
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    // SweetAlert Variable 
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(response => {
                    setClientSecret(response.data.clientSecret);
                })
        }
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setshowCardError(error.message);
            return;
        }
        else {
            setshowCardError('')
        }
        setLoader(true);
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email: user?.email || 'Noname',
                    },
                },
            },
        );
        if (intentError) {
            setshowCardError(intentError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            setLoader(false);
            setshowCardError('');
            toast.success('Payment Successfull!');
            const orderDetails = {
                date: moment().format('LLLL'),
                orderNumber: Math.floor(Math.random() * 10000),
                customer: user?.displayName,
                customerEmail: user?.email,
                billAmount: price,
                transactionId: paymentIntent.id,
                totalItem: cartItem.length,
                cartItemId: cartItem.map(item => item._id),
                foodItemId: cartItem.map(item => item.foodItemId),
                itemName: cartItem.map(item => item.foodName),
                orderStatus: 'Pending'
            }
            axiosSecure.post('/orders', orderDetails)
                .then(res => {
                    if (res.data.orderResult.insertedId) {
                        Toast.fire({
                            icon: "success",
                            title: "Ordered successfully"
                        });
                        navigate('/dashboard/orders');
                    }
                })

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className='mt-3 text-error font-semibold'>{showCardError}</p>
            <p className='text-center mt-10'><button className={stripe && clientSecret ? 'p-2 bg-orange-500 rounded-md text-white font-semibold' : 'btn btn-disabled'} type="submit" disabled={!stripe || !clientSecret || loader}>{loader ? 'Processing...' : 'Submit'}</button></p>
        </form>
    );
};

export default PaymentForm;