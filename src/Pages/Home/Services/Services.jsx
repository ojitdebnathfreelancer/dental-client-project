import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import Servies from './Servies';

const Services = () => {
    const servicesData = [
        {
            id: 1,
            name: "Fluoride Treatment",
            discription: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: fluoride,
        },
        {
            id: 2,
            name: "Cavity Filling",
            discription: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: cavity,
        },
        {
            id: 3,
            name: "Teeth Whitening",
            discription: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: whitening,
        },
    ]
    return (
        <div className='lg:mt-24 mt-14'>
            <div className='text-center'>
                <h3 className='text-primary font-bold'>OUR SERVICES</h3>
                <h1 className='text-3xl'>Services We Provide</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-7 mt-5'>
                {

                    servicesData.map(servies => <Servies key={servies.id} servies={servies}></Servies>)

                }
            </div>
        </div>
    );
};

export default Services;