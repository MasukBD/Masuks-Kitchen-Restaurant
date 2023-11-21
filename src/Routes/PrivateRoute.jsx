import React, { useContext } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(Authcontext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner text-warning h-screen flex justify-center items-center"></span>
    }

    if (user) {
        return children;
    }
    else {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
};

export default PrivateRoute;