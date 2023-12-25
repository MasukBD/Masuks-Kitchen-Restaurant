import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { Authcontext } from '../Provider/AuthProvider';
import useAxiosInterceptor from './useAxiosInterceptor';


const useCart = () => {
    const { user } = useContext(Authcontext);
    const token = localStorage.getItem('access-token');
    const axiosSecure = useAxiosInterceptor();

    //JWT Clientsite::STEP=2 get the token from localStorage and send it to server via headers
    // Instead of fetch, useState and useEffect Used tanstack/react query here 
    const { isPending, refetch, isError, data: cart = [], isLoading } = useQuery({
        queryKey: ['carts', user?.email],

        //**This is Regular way to send request with token and fetch data */
        //**In the down below we use another way to get data by Axios INSTANCE and INTERCEPTOR */

        // queryFn: async () => {
        //     const response = await fetch(`https://masuk-kitchen-server.vercel.app/carts?email=${user.email}`, { headers: { authorization: `bearer ${token}` } })
        //     return response.json();
        // },

        // **By Using Axios Instance and Interceptor **
        // --IN This way we can avoid sending header with authorization token for EveryTime--

        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data;
        },
    })
    return [cart, refetch, isError, isLoading];
}

export default useCart;