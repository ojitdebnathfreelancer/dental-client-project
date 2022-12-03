import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Loading from '../../Sheared/Loading/Loading';

const PrivetRoute = ({children}) => {
    const {user, loader} = useContext(AuthContext);
    const location = useLocation();
    
    if(loader){
        return <Loading></Loading>
    }

    if(user?.uid){
        return children;
    }
    return <Navigate to='/signin' state={{from:location}} replace></Navigate>
    
};

export default PrivetRoute;