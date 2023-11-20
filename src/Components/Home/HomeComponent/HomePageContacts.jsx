import React from 'react';
import { FaLocationArrow, FaPhoneAlt, FaClock } from 'react-icons/fa';


const HomePageContacts = () => {
    return (
        <div className='bg-black md:w-11/12 mx-auto mt-6 mb-8 p-2'>
            <div className='p-10 flex items-center justify-between gap-5 flex-col md:flex-row'>
                <div className='flex gap-3 items-center'>
                    <FaLocationArrow className='text-warning text-5xl'></FaLocationArrow>
                    <div className='text-white'>
                        <p className='text-sm font-semibold'>Want To Visit Restaurant?</p>
                        <h3 className='text-2xl font-semibold'>Gulshan-2, Dhaka</h3>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <FaPhoneAlt className='text-warning text-5xl'></FaPhoneAlt>
                    <div className='text-white'>
                        <p className='text-sm font-semibold'>Make Phone Call?</p>
                        <h3 className='text-2xl font-semibold'>+123 456 789</h3>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <FaClock className='text-warning text-5xl'></FaClock>
                    <div className='text-white'>
                        <p className='text-sm font-semibold'>We're Open Till!</p>
                        <h3 className='text-2xl font-semibold'>10:00 - 23:00</h3>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomePageContacts;