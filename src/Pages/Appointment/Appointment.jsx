import React, { useState } from 'react';
import AppointmentBanner from './AppointmentBanner/AppointmentBanner';
import Services from './Services/Services';

const Appointment = () => {
    const [selected, setSelected] = useState(new Date());

    const NewDate = (date) =>{
        if(!date) return ;
        setSelected(date)
    }

    return (
        <div>
            <AppointmentBanner selected={selected} setSelected={NewDate}></AppointmentBanner>
            <Services selected={selected}></Services>
        </div>
    );
};

export default Appointment;