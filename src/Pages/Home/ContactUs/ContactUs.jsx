import React from 'react';
import appiontment from '../../../assets/images/appointment.png';
import MainButton from '../../../Componets/MainButton/MainButton';

const ContactUs = () => {
    return (
        <div style={{
            background: `url(${appiontment})`,
            backgroundPosition:'center',
            backgroundSize:"cover"
        }} className="lg:mt-24 mb-5 py-10">
            <div className='text-center'>
                <h1 className='text-primary font-bold'>Contact Us</h1>
                <h2 className='text-white text-3xl'>Stay connected with us</h2>
            </div>
            <div className="">
                <div className="hero-content py-0 max-w-full">
                    <div className=" w-full lg:max-w-lg">
                        <div className="card-body py-5">
                            <div className="form-control">
                                <input type="text" placeholder="Email Address" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <input type="text" placeholder="Subject" className="input input-bordered" />
                            </div>
                            <textarea className="textarea textarea-bordered resize-none h-32" placeholder="Your message"></textarea>
                            <div className="form-control mt-5 text-center">
                                <MainButton>Submit</MainButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;