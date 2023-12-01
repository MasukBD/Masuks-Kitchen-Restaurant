import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import image from '../../assets/images/login/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Authcontext } from '../../Provider/AuthProvider';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

// React Hook Form used in this page 

const Register = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { createUser } = useContext(Authcontext);

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const newUser = result.user;
                updateProfile(newUser, { displayName: data.name })
                const savedUser = { name: data.name, email: data.email }
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            sendEmailVerification(newUser)
                                .then(() => {
                                    Swal.fire({
                                        title: "Registration Successfull!",
                                        text: "A Verification Email sent to your Email!",
                                        icon: "success"
                                    });
                                })
                            setError('');
                            reset();
                            navigate('/');
                        }
                    })
            })
            .catch(error => {
                setError(`${error.message}`);
            })
    };

    return (
        <>
            <Helmet><title>Register | Masuk's Kitchen Restaurant</title></Helmet>
            <div className='md:w-10/12 md:pt-20 pb-5 bg-slate-100 mx-auto px-2 md:px-4 flex flex-col md:flex-row gap-10 min-h-screen items-center justify-center'>
                <div className='md:order-2'>
                    <img src={image} alt="" />
                </div>
                <div className='w-full md:w-1/2 p-2 space-y-2 shadow-lg shadow-orange-400 md:order-1'>
                    <h2 className='text-center my-2 font-semibold text-3xl text-warning'>Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                        <div>
                            <label className='font-semibold' htmlFor="">Name</label><br />
                            <input className='w-full p-2' type="text" {...register("name", { required: true })} placeholder='Enter Your Name' id="name" />
                            {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold' htmlFor="">Email</label><br />
                            <input className='w-full p-2' type="email" {...register("email", { required: true })} placeholder='Please Enter Email' id="email" />
                            {errors.email?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold' htmlFor="">Password</label>
                            <br />
                            <input className='w-full p-2' type="password" placeholder='Please Enter Password' id="password"
                                {...register("password",
                                    { required: true, minLength: 6, maxLength: 16, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}
                            />
                            {errors.password?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                            {errors.password?.type === 'minLength' && <span className='text-sm text-red-500'>Password Should be atleast 6 character!</span>}
                            {errors.password?.type === 'maxLength' && <span className='text-sm text-red-500'>Password can be maximum 16 character!</span>}
                            {errors.password?.type === 'pattern' && <span className='text-sm text-red-500'>Password should include atleast one capital letter, one small letter, one number and one special character '!@#$&*'!</span>}
                        </div>
                        {
                            error && <p className='text-red-500 text-xs font-semibold my-0.5'>{error}</p>
                        }
                        <div>
                            <input className='text-center my-3 text-warning font-semibold border-b-2 p-2 bg-black hover:text-white hover:bg-orange-400 w-full' type="submit" value="Register" />
                        </div>
                    </form>
                    <div className="divider">or</div>
                    <p className=' py-2 text-center'>Already have an account or Social <Link className='underline text-blue-500' to="/login">Login</Link> ?</p>
                </div>
            </div>
        </>
    );
};

export default Register;