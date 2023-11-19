import React, { useEffect, useState } from 'react';
import image from '../../assets/images/login/login.png';
import facebook from '../../assets/images/icons/facebook.png';
import google from '../../assets/images/icons/google.png';
import github from '../../assets/images/icons/github.png';
import { Link } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const [error, setError] = useState('');

    useEffect(() => {
        loadCaptchaEnginge(4);
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const captchaCode = form.captcha.value;
        if (validateCaptcha(captchaCode)) {
            alert('Captcha Matched');
            form.reset()
        }
        else {
            setError("captcha doesn't match! try again!")
        }


    }

    return (
        <>
            <Helmet><title>Login | Masuk's Kitchen Restaurant</title></Helmet>
            <div className='md:w-10/12 md:pt-20 pb-5 bg-slate-100 mx-auto px-2 md:px-4 flex flex-col md:flex-row gap-10 min-h-screen items-center justify-center'>
                <div>
                    <img src={image} alt="" />
                </div>
                <div className='w-full md:w-1/2 p-2 space-y-2 shadow-lg shadow-orange-400'>
                    <h2 className='text-center my-2 font-semibold text-3xl text-warning'>Please Login</h2>
                    <form onSubmit={handleLogin} className='space-y-3'>
                        <div>
                            <label className='font-semibold' htmlFor="">Email</label><br />
                            <input className='w-full p-2' type="email" required name="email" placeholder='Please Enter Email' id="email" />
                        </div>
                        <div>
                            <label className='font-semibold' htmlFor="">Password</label><br />
                            <input className='w-full p-2' required type="password" name="password" placeholder='Please Enter Password' id="password" />
                        </div>
                        <div className='flex gap-5'>
                            <div><LoadCanvasTemplate /></div>
                            <input className='grow p-2' required type="text" name="captcha" placeholder='write here' id="captcha" />
                        </div>
                        <div>
                            <input className='text-center my-3 text-warning font-semibold border-b-2 p-2 bg-black hover:text-white hover:bg-orange-400 w-full' type="submit" value="Login" />
                        </div>
                    </form>
                    <div className="divider">or</div>
                    <p className='text-center'>Sign in with</p>
                    <div className='text-center py-2 gap-4 flex items-center justify-center'>
                        <button><img className='w-1/2 mx-auto' title='facebook' src={facebook} alt="" /></button>
                        <button><img className='w-1/2 mx-auto' title='google' src={google} alt="" /></button>
                        <button><img className='w-1/2 mx-auto' title='github' src={github} alt="" /></button>
                    </div>
                    <p className=' py-2 text-center'>Sign up with Email Password <Link className='underline text-blue-500' to="/register">Register</Link> ?</p>
                </div>
            </div>
        </>
    );
};

export default Login;