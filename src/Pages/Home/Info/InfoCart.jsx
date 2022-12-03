import React from 'react';

const InfoCart = ({info}) => {
    const {name, discription, icon, bgClass} = info;
    return (
        <div className={`card lg:card-side ${bgClass}  shadow-xl p-6`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title text-white">{name}</h2>
                <p className='text-white'>{discription}</p>
            </div>
        </div>
    );
};

export default InfoCart;