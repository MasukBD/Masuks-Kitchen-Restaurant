import React, { useContext } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import useAxiosInterceptor from './useAxiosInterceptor';
import { useQuery } from '@tanstack/react-query';

const useOrders = () => {
    const { user, loading } = useContext(Authcontext);
    const axiosSecure = useAxiosInterceptor();
    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/orders?email=${user?.email}`)
            return response.data;
        }
    })

    return [orders, refetch, isLoading];
};

export default useOrders;