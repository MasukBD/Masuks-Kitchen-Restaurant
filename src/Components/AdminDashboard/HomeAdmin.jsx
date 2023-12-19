import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../Provider/AuthProvider';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';

const HomeAdmin = () => {
    const { user } = useContext(Authcontext);
    const axiosSecure = useAxiosInterceptor();
    const [totalBalance, setTotalBalance] = useState({});
    const [adminData, setAdminData] = useState({});
    useEffect(() => {
        axiosSecure.get('/adminData')
            .then(response => {
                setAdminData(response.data);
            });
    }, []);

    useEffect(() => {
        axiosSecure.get('/getBalance')
            .then(res => {
                setTotalBalance(res.data);
            })
    }, []);
    console.log(totalBalance?.available?.[0]?.amount)
    console.log(adminData && adminData?.customer)

    return (
        <>
            <h1 className='my-6 font-semibold text-lg md:text-3xl ml-12 md:ml-40 text-orange-500'>Hello {user?.displayName}, Welcome Back!</h1>

        </>
    );
};

export default HomeAdmin;