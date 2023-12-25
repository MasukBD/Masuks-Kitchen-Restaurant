import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTilte from '../SharedComponent/SectionTilte';
import HomePageContacts from '../Home/HomeComponent/HomePageContacts';
import 'react-phone-number-input/style.css'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import { Authcontext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Reservation = () => {
    const { register, handleSubmit, setValue, reset, watch, formState: { errors }, control } = useForm();
    const axiosSecure = useAxiosInterceptor();
    const { user } = useContext(Authcontext);
    const navigate = useNavigate();


    const onSubmit = (data) => {
        const booking = { name: data.name, phone: data.phoneInputWithCountrySelect, email: data.email, time: data.selectedDate, people: data.people, baby: data.baby ? data.baby : 0, status: 'pending' }
        axiosSecure.post('/bookings', booking)
            .then(res => {
                if (res.data.insertedId) {
                    reset();
                    navigate('/dashboard/myBookings');
                    let timerInterval;
                    Swal.fire({
                        title: "Reservation Done!",
                        html: "Processing in <b></b> milliseconds.",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {

                        }
                    });
                }
            })



    }
    return (
        <>
            <Helmet><title>Reserve Your Seat || Masuk's Kitchen Restaurant</title></Helmet>
            <SectionTilte subheading={'-- Feel The Moments --'} heading={'Grab Your Seat Now'}></SectionTilte>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-orange-200 p-4 space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <div>
                            <label className='font-semibold'>Name <span className='text-error'>*</span></label><br />
                            <input defaultValue={user?.displayName} className='w-full p-2 rounded-md' placeholder='Enter Your Name' type="text" id="name" {...register("name", { required: true })} />
                            {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Email <span className='text-error'>*</span></label><br />
                            <input defaultValue={user?.email} className='w-full p-2 rounded-md' placeholder='Enter Your Email' type="email" id="email" {...register("email", { required: true })} />
                            {errors.email?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Phone No. <span className='text-error'>*</span></label><br />
                            <PhoneInputWithCountry
                                name="phoneInputWithCountrySelect"
                                control={control}
                                rules={{ required: true }}
                                international
                                defaultCountry="BD"
                                className='custom-style-onPhone'
                                placeholder="Enter phone number"
                                limitMaxLength />
                            {errors.phoneInputWithCountrySelect?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <div>
                            <label className='font-semibold'>Choose Date <span className='text-error'>*</span></label><br />
                            <Controller
                                control={control}
                                name="selectedDate"
                                defaultValue={new Date()}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        rules={{ required: true }}
                                        onChange={(date) => setValue('selectedDate', date)}
                                        showTimeSelect
                                        minDate={(new Date()).setDate((new Date()).getDate() + 1)}
                                        maxDate={(new Date()).setDate((new Date()).getDate() + 11)}
                                        minTime={new Date().setHours(12, 0)}
                                        maxTime={new Date().setHours(20, 30)}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeFormat="HH:mm"
                                        className='p-2 rounded-md w-[250px]'
                                        placeholderText="Select a Date and Time"
                                    />
                                )}
                            />
                            {errors.selectedDate?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>People <span className='text-error'>*</span></label><br />
                            <input className='w-full p-2 rounded-md' type="number" id="people" min='1' max='120' {...register("people", { required: true })} />
                            {errors.people?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Baby Seat(if) <span>*</span></label><br />
                            <input {...register("baby")} className='w-full p-2 rounded-md' type="number" id="baby" min='1' max='120' />
                        </div>
                    </div>
                    <div className='text-center'>
                        <input className='p-2 mt-6 bg-black hover:bg-orange-500 text-white font-semibold' type="submit" value="Book Now" />
                    </div>
                </form>
            </div>
            <SectionTilte subheading={'-- For Your Inconvenience --'} heading={'Contact Info'}></SectionTilte>
            <HomePageContacts></HomePageContacts>
        </>
    );
};

export default Reservation;