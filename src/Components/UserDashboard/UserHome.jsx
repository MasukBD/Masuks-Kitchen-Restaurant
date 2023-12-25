import React, { useContext } from 'react';
import Tilt from 'react-parallax-tilt';
import { Authcontext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import useMenu from '../../Hooks/useMenu';
import useOrders from '../../Hooks/useOrders';
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

// Pie Chart Variable 
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const UserHome = () => {
    const { user } = useContext(Authcontext);
    const [, , offeredItems] = useMenu();
    const [orders] = useOrders();
    const pendingOrder = orders.filter(order => order.orderStatus === 'Pending');
    const axiosSecure = useAxiosInterceptor();

    const { data: orderSummary = [], isLoading } = useQuery({
        queryKey: ['orderSummary', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order-summary?email=${user?.email}`)
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 text-warning'></span></p>
    };

    return (
        <>
            <h1 className='my-6 font-semibold text-lg md:text-3xl ml-10 md:ml-36 text-orange-500 animate__animated animate__fadeInLeft'>Hello {user?.displayName}, Welcome Back!</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <Tilt>
                    <div className='animate__animated animate__fadeInLeft h-40 bg-gradient-to-r from-pink-400  to-rose-600 rounded-md flex flex-col items-center justify-center'>
                        <h1 className='text-2xl text-white font-semibold'>MKR Balance</h1>
                        <h2 className='text-4xl text-white font-semibold'>000 $$</h2>
                    </div>
                </Tilt>
                <Tilt>
                    <Link to='/order/offered'>
                        <div className='animate__animated animate__fadeInRight lg:animate__fadeInDown h-40 bg-gradient-to-r from-red-500 to-cyan-400 rounded-md flex flex-col items-center justify-center space-y-2'>
                            <h1 className='text-2xl text-white font-semibold'>My Offer</h1>
                            <h1 className='text-4xl text-white font-semibold'>{offeredItems?.length}</h1>
                        </div>
                    </Link>
                </Tilt>
                <Tilt>
                    <div className='animate__animated animate__fadeInLeft h-40 bg-gradient-to-r from-cyan-500 to-red-500 rounded-md flex flex-col items-center justify-center space-y-2'>
                        <h1 className='text-2xl text-white font-semibold'>Pending Order</h1>
                        <h1 className='text-4xl text-white font-semibold'>{pendingOrder?.length}</h1>
                    </div>
                </Tilt>
                <Tilt>
                    <div className='animate__animated animate__fadeInRight h-40 bg-gradient-to-r from-red-500 to-yellow-500 rounded-md flex flex-col items-center justify-center  space-y-2'>
                        <h1 className='text-2xl text-white font-semibold'>Total Orders</h1>
                        <h1 className='text-4xl text-white font-semibold'>{orders?.length}</h1>
                    </div>
                </Tilt>
            </div>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2'>
                <div className='bg-pink-200 border-b-2 flex flex-col items-center justify-center md:border-b-0 border-pink-700 h-[400px]'>
                    {
                        user?.photoURL ? <img className='scale-110 rounded-full' src={user.photoURL} alt="" /> : <FaUserCircle className='text-7xl'></FaUserCircle>
                    }
                    <button className='flex items-center gap-2 justify-center underline my-4'>Update Profile <FaEdit></FaEdit></button>
                    <h2 style={{ fontFamily: 'Domine' }} className='font-semibold text-2xl'>{user.displayName}</h2>
                </div>
                <div className='bg-orange-200 flex flex-col items-center justify-center md:border-l-2 border-pink-700 h-[400px]'>
                    <h3 style={{ fontFamily: 'Domine' }} className='font-semibold my-2 text-2xl' >Your Prefarence</h3>
                    {
                        orderSummary.length === 0 ?
                            <p className='font-semibold text-error'>No data to show! To see you prefarence <Link to='/order/popular'><span className='underline'>Order Now</span></Link></p>
                            :
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={300} height={300}>
                                    <Legend></Legend>
                                    <Pie
                                        data={orderSummary}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="totalItems"
                                    >
                                        {orderSummary.map((entry, index) => (
                                            <Cell name={entry.category} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                    }
                </div>
            </div>
        </>
    );
};

export default UserHome;