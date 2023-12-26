import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../Provider/AuthProvider';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import Tilt from 'react-parallax-tilt';
import 'animate.css';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Sector, PieChart, Pie, ResponsiveContainer, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

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

    const { data: saleStatictis = [], isLoading } = useQuery({
        queryKey: ['saleStatictis'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stat-by-category')
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 text-warning'></span></p>
    }

    return (
        <>
            <h1 className='my-6 font-semibold text-lg md:text-3xl ml-12 md:ml-40 text-orange-500 animate__animated animate__fadeInLeft'>Hello {user?.displayName}, Welcome Back!</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <Tilt>
                    <div className='animate__animated animate__fadeInLeft h-40 bg-gradient-to-r from-green-500  to-yellow-500 rounded-md flex flex-col items-center justify-center'>
                        <h1 className='text-3xl text-white font-semibold'>Balance</h1>
                        <h2 className='text-xl text-white font-semibold'>Net Amount: {totalBalance?.available?.[0]?.amount} $$</h2>
                        <h2 className='text-xl text-white font-semibold'>Pending: {totalBalance?.pending?.[0]?.amount} $$</h2>
                    </div>
                </Tilt>
                <Tilt>
                    <div className='animate__animated animate__fadeInRight lg:animate__fadeInDown h-40 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-md flex flex-col items-center justify-center space-y-2'>
                        <h1 className='text-3xl text-white font-semibold'>Customer</h1>
                        <h1 className='text-4xl text-white font-semibold'>{adminData?.customer}</h1>
                    </div>
                </Tilt>
                <Tilt>
                    <div className='animate__animated animate__fadeInLeft h-40 bg-gradient-to-r from-orange-500 to-red-500 rounded-md flex flex-col items-center justify-center space-y-2'>
                        <h1 className='text-3xl text-white font-semibold'>Items</h1>
                        <h1 className='text-4xl text-white font-semibold'>{adminData?.totalItem}</h1>
                    </div>
                </Tilt>
                <Tilt>
                    <div className='animate__animated animate__fadeInRight h-40 bg-gradient-to-r from-red-500 to-red-800 rounded-md flex flex-col items-center justify-center  space-y-2'>
                        <h1 className='text-3xl text-white font-semibold'>Orders</h1>
                        <h1 className='text-4xl text-white font-semibold'>{adminData?.totalOrder}</h1>
                    </div>
                </Tilt>
            </div>
            <div className='my-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
                    <div className='mt-5 overflow-x-auto'>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                width={500}
                                height={300}
                                data={saleStatictis}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Bar dataKey="totalSales" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                    {saleStatictis.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className='text-center my-4 font-semibold'>Figure 1: Simple BarChart Showing Sale Data By Category</p>
                    </div>
                    <div className='overflow-x-auto'>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart width={400} height={400}>
                                <Legend></Legend>
                                <Pie
                                    data={saleStatictis}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="totalItemsSold"
                                >
                                    {saleStatictis.map((entry, index) => (
                                        <Cell name={entry.category} key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeAdmin;