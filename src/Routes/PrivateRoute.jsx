import React, { useContext } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(Authcontext);
    const location = useLocation();

    if (loading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 md:w-32 text-warning'></span></p>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />
};

export default PrivateRoute;