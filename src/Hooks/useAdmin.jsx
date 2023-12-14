import React from 'react';
import { useContext } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import useAxiosInterceptor from './useAxiosInterceptor';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useContext(Authcontext);
    const axiosSecure = useAxiosInterceptor();
    const { data: isAdmin, refetch, isLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/${user?.email}`)
            return response.data.admin;
        }
    })
    return [refetch, isAdmin, isLoading];
};

export default useAdmin;