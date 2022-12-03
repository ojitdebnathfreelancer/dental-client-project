import React from 'react';
import chair from '../../../assets/images/chair.png';
import appointment from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({selected,setSelected}) => {
    return (
        <div style={{
            background:`url(${appointment})`,
            backgroundSize:"cover",
            backgroundPosition:'center'
        }} className="hero lg:py-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="w-full lg:w-1/2 rounded-lg shadow-2xl lg:ml-20" alt="" />
                <div>
                    <DayPicker
                    mode='single'
                    selected={selected}
                    onSelect={setSelected}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;