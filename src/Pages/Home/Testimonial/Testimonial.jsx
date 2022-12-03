import React from 'react';
import pepole1 from '../../../assets/images/people1.png';
import pepole2 from '../../../assets/images/people2.png';
import pepole3 from '../../../assets/images/people3.png';
import quote from '../../../assets/icons/quote.svg';
import TestimonialCard from './TestimonialCard';

const Testimonial = () => {
    const testInfo = [
        {
            id:1,
            name:"Winson Herry",
            address:"California",
            img:pepole1,
            discription:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"
        },
        {
            id:2,
            name:"Angle leady",
            address:"NewYork",
            img:pepole2,
            discription:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"
        },
        {
            id:3,
            name:"Laila mery",
            address:"California",
            img:pepole3,
            discription:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"
        }
    ]
    return (
        <div className='mt-12 px-8'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-primary font-bold'>Testimonial</h2>
                    <h2 className='text-3xl'>What Our Patients Says</h2>
                </div>
                <img className='lg:h-40 h-20' src={quote} alt="quote" />
            </div>
            <div className='grid grid-flow-col-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-10'>
                {
                    testInfo.map(info => <TestimonialCard key={info.id} info={info}></TestimonialCard>)
                }
            </div>
        </div>
    );
};

export default Testimonial;