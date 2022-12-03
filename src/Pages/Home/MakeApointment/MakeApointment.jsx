import React from 'react';
import MainButton from '../../../Componets/MainButton/MainButton';
import doctor from '../../../assets/images/doctor-small.png';
import appiontment from '../../../assets/images/appointment.png';

const MakeApointment = () => {
    return (
        <section className="lg:h-[508px] mt-12 lg:mt-52 py-5 lg:py-0" style={{background:`url(${appiontment})`, backgroundSize:"cover", backgroundPosition:"center"}}>
            <div className="card grid grid-cols-1 lg:grid-cols-2 px-8 lg:mt-12">
                <figure className='lg:-mt-36'><img className='hidden lg:block' src={doctor} alt="doctor img" /></figure>
                <div className="flex flex-col justify-center">
                    <h1 className='text-primary font-bold mb-4'>Appiontment</h1>
                    <h2 className="card-title text-3xl text-white">Make an appointment Today</h2>
                    <p className='my-3 lg:my-5 text-white'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <MainButton>GET STARTED</MainButton>
                </div>
            </div>
        </section>
    );
};

export default MakeApointment;