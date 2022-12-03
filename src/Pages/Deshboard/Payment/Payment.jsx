import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../Sheared/Loading/Loading';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_PAYMENT_Pubkey);

const Payment = () => {
    const booking = useLoaderData();
    const { appointmentDate, price, slot, treatment } = booking;

    const navigation = useNavigation;
    if (navigation.state === 'loading') {
        return <Loading></Loading>
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div>
                            <h2 className='text-3xl'>Payment for <span className='font-bold'>{treatment}</span></h2>
                            <p className='text-1xl mt-3'>Please pay <strong>${price}</strong> for you appointment on {appointmentDate} at {slot}</p>
                            <p className='text-center mt-5'>Please Provide your card informations</p>
                            <div className='max-w-sm mx-auto'>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm booking={booking}></CheckoutForm>
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;