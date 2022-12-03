import React from 'react';

const Moda = ({title, message, closeModal, succesAction, modalData}) => {
    return (
        <div>
            <input type="checkbox" id="modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={()=> succesAction(modalData)} htmlFor="modal" className="btn">Delete</label>
                        <button onClick={closeModal} className='btn btn-outline'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moda;