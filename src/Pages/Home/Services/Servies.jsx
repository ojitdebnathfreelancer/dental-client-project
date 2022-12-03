import React from 'react';

const Servies = ({servies}) => {
    const {name, discription, icon} = servies;
    return (
        <div className={`card lg:card-side shadow-xl p-6`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title text-black">{name}</h2>
                <p className='text-black'>{discription}</p>
            </div>
        </div>
    );
};

export default Servies;