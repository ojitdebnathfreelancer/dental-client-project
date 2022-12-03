import React from 'react';


const AllModal = ({closeAllModal, allsuccesAction, allmessage }) => {
    return (
        <div>
            <input type="checkbox" id="allModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">{allmessage}</p>
                    <div className="modal-action">
                        <label onClick={allsuccesAction} htmlFor="allModal" className="btn">Delete</label>
                        <button onClick={() => closeAllModal(false)} className='btn btn-outline'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllModal;