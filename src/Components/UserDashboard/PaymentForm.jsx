import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');

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
            card,
        });

        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError('')
            console.log(paymentMethod)
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
            <p className='mt-3 text-error font-semibold'>{cardError}</p>
            <p className='text-center mt-10'><button className='p-2 bg-orange-500 rounded-md text-white font-semibold' type="submit" disabled={!stripe}>
                Submit
            </button></p>
        </form>
    );
};

export default PaymentForm;