import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [TranId, setTranId] = useState('');
    const [processing, setProcessing] = useState(false);

    const errorRemove = () => {
        setCardError('');
        setProcessing(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://doctor-portal-server-smoky.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ price: booking.price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            });
    }, [booking]);

    const handleSubmit = async event => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        };

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError('');
        }

        const { paymentIntent, error: confiremError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: booking.patientName,
                        email: booking.email
                    },
                },
            },
        );

        if (confiremError) {
            setCardError(confiremError.message)
        }

        if (paymentIntent.status === 'succeeded') {
            const payment = {
                price: booking.price,
                transactionId: paymentIntent.id,
                email: booking.email,
                bookingId: booking._id
            };

            fetch('https://doctor-portal-server-smoky.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        setTranId(paymentIntent.id);
                        toast.success('Your payment succeeded');
                        setProcessing(false);
                        navigate('/deshboard');
                    }
                })
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    onChange={errorRemove}
                    className='mt-5 border-2 border-zinc-400 px-2 py-1 rounded'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#222222',
                                '::placeholder': {
                                    color: '#22222',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-secondary btn-sm mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Send Money
                </button>
            </form>
            <p className='text-red-600'>{cardError}</p>
            {
                TranId &&
                <p>Your transactionID <span className='font-bold'>{TranId}</span></p>
            }
        </div>
    );
};

export default CheckoutForm;