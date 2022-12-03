import React from 'react';
import treatment from '../../../assets/images/treatment.png';
import MainButton from '../../../Componets/MainButton/MainButton';

const Care = () => {
    return (
        <div className="card grid lg:grid-cols-2 bg-base-100 px-8 mt-12 lg:mt-36">
            <figure><img className='lg:h-[575px] md:h-[575px] h-[406px] rounded-2xl' src={treatment} alt="treatment img" /></figure>
            <div className="flex flex-col justify-center p-0">
                <h2 className="card-title text-4xl">Exceptional Dental Care, on Your Terms</h2>
                <p className='my-3 lg:my-8'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <MainButton>GET STARTED</MainButton>
            </div>
        </div>
    );
};

export default Care;