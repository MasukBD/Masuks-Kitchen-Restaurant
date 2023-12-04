import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTilte from '../SharedComponent/SectionTilte';
import { FaTrashAlt, FaUserCog } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';

const AllUsers = () => {
    // Option 1: use Regular Tanstack/react Query for fetching data using fetch 
    // ----------------------------------------------------------
    // const token = localStorage.getItem('access-token')
    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const response = await fetch('http://localhost:5000/users', {
    //             headers: {
    //                 authorization: `bearer ${token}`
    //             }
    //         })
    //         return response.json();
    //     }
    // });
    //-----------------------------------------------------option 1 finish here

    // Option 2: Use CustomHook(useAxiosInterceptor) made by Axios(Instance & Interceptor) with Tanstack/reactQuery 
    const axiosSecure = useAxiosInterceptor();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users')
            return response.data;
        }
    });

    const handleUserRole = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be the Admin of This Shop!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${id}`, {
                    method: "PATCH",
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify({ role: 'admin' })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            Swal.fire({
                                title: "Added!",
                                text: "This User Added As Admin.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    const handleUserDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    return (
        <>
            <Helmet><title>All Users - Dashboard | Masuk's Kitchen Restaurant</title></Helmet>
            <SectionTilte subheading={'-- Users List --'} heading={"All Users Is Here!"}></SectionTilte>
            <h2 style={{ fontFamily: 'Domine', }} className='font-semibold text-lg md:text-2xl text-center'>Total Users: <span className='text-orange-500'>{users.length}</span></h2>
            <div className="overflow-x-auto mt-4 p-2 bg-white">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr className='font-semibold' key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role == "admin" ? <span>Admin</span> : <FaUserCog onClick={() => handleUserRole(user._id)} className='text-4xl btn-warning btn-outline rounded-full p-2' />}</td>
                            <td><button onClick={() => handleUserDelete(user._id)} className="btn-error btn-outline rounded-full p-2 text-2xl"><FaTrashAlt></FaTrashAlt></button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllUsers;