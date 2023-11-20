import React from 'react';
import { Helmet } from 'react-helmet-async';
import image from '../../assets/images/login/login.png';
import { Link } from 'react-router-dom';

const Register = () => {

    const handleRegister = event => {
        event.preventDefault();
    }

    return (
        <>
            <Helmet><title>Register | Masuk's Kitchen Restaurant</title></Helmet>
            <div className='md:w-10/12 md:pt-20 pb-5 bg-slate-100 mx-auto px-2 md:px-4 flex flex-col md:flex-row gap-10 min-h-screen items-center justify-center'>
                <div className='md:order-2'>
                    <img src={image} alt="" />
                </div>
                <div className='w-full md:w-1/2 p-2 space-y-2 shadow-lg shadow-orange-400 md:order-1'>
                    <h2 className='text-center my-2 font-semibold text-3xl text-warning'>Register</h2>
                    <form onSubmit={handleRegister} className='space-y-3'>
                        <div>
                            <label className='font-semibold' htmlFor="">Name</label><br />
                            <input className='w-full p-2' type="text" required name="name" placeholder='Enter Your Name' id="name" />
                        </div>
                        <div>
                            <label className='font-semibold' htmlFor="">Email</label><br />
                            <input className='w-full p-2' type="email" required name="email" placeholder='Please Enter Email' id="email" />
                        </div>
                        <div>
                            <label className='font-semibold' htmlFor="">Password</label><br />
                            <input className='w-full p-2' required type="password" name="password" placeholder='Please Enter Password' id="password" />
                        </div>
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