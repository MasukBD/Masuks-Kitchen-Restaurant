import React, { useContext } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosInterceptor from './useAxiosInterceptor';

const useBookings = () => {
    const { user } = useContext(Authcontext);
    const axiosSecure = useAxiosInterceptor();
    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`)
            return res.data;
        }
    })
    return [bookings, refetch, isLoading];
};

export default useBookings;