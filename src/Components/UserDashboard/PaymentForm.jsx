import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import { Authcontext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const PaymentForm = ({ price }) => {
    const { user } = useContext(Authcontext);
    const stripe = useStripe();
    const elements = useElements();
    const [showCardError, setshowCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosInterceptor();
    const [loader, setLoader] = useState(false);
    const [transactionId, setTransactionId] = useState(null);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(response => {
                setClientSecret(response.data.clientSecret);
            })
    }, []);

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
                        email: user?.email || 'Not Found',
                    },
                },
            },
        );
        if (intentError) {
            setshowCardError(intentError.message);
            return;
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                setLoader(false);
                setshowCardError('');
                setTransactionId(paymentIntent.id);
                toast.success('Payment Successfull!');
            }
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
            <p className='text-center mt-10'><button className='p-2 bg-orange-500 rounded-md text-white font-semibold' type="submit" disabled={!stripe || !clientSecret || loader}>{loader ? 'Processing...' : 'Submit'}</button></p>
        </form>
    );
};

export default PaymentForm;