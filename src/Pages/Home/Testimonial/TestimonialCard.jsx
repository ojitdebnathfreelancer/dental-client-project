import React from 'react';

const TestimonialCard = ({ info }) => {
    const { name, address, discription, img } = info;
    return (
        <div className="card glass p-5">
            <p>{discription}</p>
            <div className="mt-5">
                <div className='flex items-center'>
                    <img className='h-20 w-20 border-2 border-primary rounded-full' src={img} alt="person-img" />
                    <div className='ml-5'>
                        <p>{name}</p>
                        <p>{address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;