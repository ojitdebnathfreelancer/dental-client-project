import React, { useContext} from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const Servies = ({ servies, handelSelectServies }) => {
    const {user} = useContext(AuthContext);

    const handelToast = () =>{
        toast.error("Please login befor booking")
    };
    // login toast 

    const { name,price, slots } = servies;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-2xl text-center text-secondary font-bold">{name}</h2>
                <p className='text-center'>{slots.length > 0? slots[0] :
                "Try Another Day"}</p>
                <p className='text-center'>{slots.length} SPACES AVAILABLE</p>
                <p className='text-center font-bold'><small>Price: ${price}</small></p>
                <div className="card-actions justify-center">
                    {
                        user? <label onClick={()=>handelSelectServies(servies)} htmlFor="appointModal" disabled={slots.length === 0} className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white">Book Appointment</label>
                        :
                        <button onClick={handelToast} className='btn btn-primary bg-gradient-to-r from-secondary to-primary text-white'>Book Appointment</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Servies;