import React from 'react';
import Banner from './Banner/Banner';
import Care from './Care/Care';
import ContactUs from './ContactUs/ContactUs';
import Infos from './Info/Infos';
import MakeApointment from './MakeApointment/MakeApointment';
import Services from './Services/Services';
import Testimonial from './Testimonial/Testimonial';
import bg from '../../assets/images/bg.png';

const Home = () => {
    return (
        <div>
            <div style={{
                background:`url(${bg})`,
                backgroundSize:"cover",
                backgroundPosition:"center"
            }}>
                <Banner></Banner>
                <Infos></Infos>
            </div>
            <Services></Services>
            <Care></Care>
            <MakeApointment></MakeApointment>
            <Testimonial></Testimonial>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;