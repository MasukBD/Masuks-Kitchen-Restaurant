import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTilte from '../SharedComponent/SectionTilte';
import useBookings from '../../Hooks/useBookings';
import { FaEdit } from 'react-icons/fa';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import Swal from 'sweetalert2';

const ManageBookings = () => {
    const [bookings, refetch, isLoading] = useBookings();
    const axiosSecure = useAxiosInterceptor();


    // SweetAlert Variable 
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleBookingsStatus = id => {
        axiosSecure.patch(`/bookings/${id}`, { status: 'Approved' })
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Toast.fire({
                        icon: "success",
                        title: "Booking Approved!"
                    });
                }
            })
    }

    if (isLoading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 text-warning'></span></p>
    };

    return (
        <>
            <Helmet><title>Manage Bookings | Masuk's Kitchen Restaurant</title></Helmet>
            <SectionTilte heading={'Manage All Reservation'} subheading={'-- Encourage People to Visit --'}></SectionTilte>
            <div className='mt-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className='bg-warning text-white'>
                            <tr>
                                <th>Sl</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Time</th>
                                <th>people</th>
                                <th>Action</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [...bookings].reverse().map((booking, i) => <tr className='font-semibold' key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking.name}</td>
                                    <td>{booking.phone}</td>
                                    <td>{booking.time}</td>
                                    <td>{booking.people}</td>
                                    <td><button className='flex items-center gap-1 hover:text-warning'>Edit <FaEdit></FaEdit></button></td>
                                    <td className={booking?.status === 'pending' ? 'text-error' : ''}><button onClick={() => handleBookingsStatus(booking._id)} disabled={booking?.status === 'Approved'}>{booking.status}</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {
                    bookings.length <= 0 && <p className='font-semibold text-error text-center mt-5'>No Bookings Yet!</p>
                }
            </div>
        </>
    );
};

export default ManageBookings;