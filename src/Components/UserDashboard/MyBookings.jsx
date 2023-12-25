import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTilte from '../SharedComponent/SectionTilte';
import useBookings from '../../Hooks/useBookings';

const MyBookings = () => {
    const [bookings, , isLoading] = useBookings();

    if (isLoading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 text-warning'></span></p>
    }
    return (
        <>
            <Helmet><title>My Bookings - Masuk's Kitchen Restaurnat</title></Helmet>
            <SectionTilte heading={"My Bookings"} subheading={"-- Adventure Awaits --"}></SectionTilte>
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
                                    <td className={booking?.status === 'pending' ? 'text-error' : ''}>{booking.status}</td>
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

export default MyBookings;