import React, { useContext } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(Authcontext);
    const [, isAdmin, isLoading] = useAdmin();
    const location = useLocation();

    if (loading || isLoading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 md:w-24 text-warning'></span></p>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />
};

export default AdminRoute;