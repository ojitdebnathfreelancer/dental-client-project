import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const ErrorPage = () => {
    const error = useRouteError();
    const {userLogout} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const logout = () => {
        userLogout()
            .then(() => {
                navigate('/signin')
            })
            .catch(error => console.error(error))
    };
    // logout handel 
    return (
        <div>
            <p className='text-1xl'>Something is wrong</p>
            <p className='text-4xl text-red-500'>{error}</p>
            <h4 className='text-2xl'>
                <button onClick={logout} className='btn btn-secondary text-white ml-3'>
                    Sign Out
                </button>
            </h4>
        </div>
    );
};

export default ErrorPage;