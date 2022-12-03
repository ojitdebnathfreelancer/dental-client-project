import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import UseAdmin from '../../Hooks/UseAdmin';
import Loading from '../../Sheared/Loading/Loading';

const Adminroute = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = UseAdmin(user?.email);

    if (loader || isAdminLoading) {
        return <Loading></Loading>
    }

    if (user?.uid && isAdmin) {
        return children;
    }
    return <Navigate to='/signin' state={{ from: location }} replace></Navigate>

};

export default Adminroute;