import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { Authcontext } from '../Provider/AuthProvider'
const useCart = () => {
    const { user } = useContext(Authcontext);
    const { isPending, refetch, isError, data: cart = [], error } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/carts?email=${user.email}`)
            return response.json()
        },
    })
    return [cart, refetch, isError];
}

export default useCart;