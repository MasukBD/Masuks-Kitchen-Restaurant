import React, { useContext, useEffect } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAxiosInterceptor = () => {
    const { logOut } = useContext(Authcontext);
    const navigate = useNavigate();

    // Create an Axios Instance 
    const axiosSecure = axios.create({
        baseURL: 'https://masuk-kitchen-server.vercel.app',
    });

    useEffect(() => {
        // Add a request interceptor  step==1 send request
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            }
        });
        // step==2 send response 
        axiosSecure.interceptors.response.use((response) => response, async (error) => {
            const status = error.response.status;
            if (error.response &&
                (status === 401 || status === 403)) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        })
    }, [logOut, navigate, axiosSecure]);

    return axiosSecure;
};

export default useAxiosInterceptor;