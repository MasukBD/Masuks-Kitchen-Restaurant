import React, { useEffect, useState } from 'react';
import image from '../../assets/images/login/login.png';
import facebook from '../../assets/images/icons/facebook.png';
import google from '../../assets/images/icons/google.png';
import github from '../../assets/images/icons/github.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { Authcontext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import Swal from 'sweetalert2';

const Login = () => {
    const [error, setError] = useState('');
    const { Login, passwordReset, createUserWithGoogle } = useContext(Authcontext);
    const getEmail = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

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
            Login(email, password)
                .then(result => {
                    const loggedUser = result.user;
                    form.reset();
                    toast.success(`${loggedUser.displayName} logged in Successfully!`)
                    setError('');
                    navigate(from, { replace: true });
                })
                .catch(error => {
                    setError(`Something went wrong! Error message: ${error.message}`)
                })
        }
        else {
            setError("captcha doesn't match! try again!")
        }
    };

    // Password Reset Email Sent 
    const handleForgetPassword = () => {
        const email = getEmail.current.value;
        if (email) {
            passwordReset(email)
                .then(() => {
                    Swal.fire({
                        title: "Sent!",
                        text: "A Password Reset Email Sent To Your Email!",
                        icon: "info"
                    });
                    setError('');
                })
                .catch(error => {
                    setError(`${error.message}`)
                })

        }
        else {
            setError('Please Enter A Valid Email!')
        }

    };

    // Google Sign IN 
    const handleGoogleLogin = () => {
        createUserWithGoogle()
            .then(result => {
                const newUser = result.user;
                const savedUser = { name: newUser.displayName, email: newUser.email }
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        toast.success('Sign In Successfull!');
                        setError('');
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                setError(`${error.message}`);
            })
    };

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
                            <input className='w-full p-2' ref={getEmail} type="email" required name="email" placeholder='Please Enter Email' id="email" />
                        </div>
                        <div>
                            <label className='font-semibold' htmlFor="">Password</label><br />
                            <input className='w-full p-2' required type="password" name="password" placeholder='Please Enter Password' id="password" />
                            <span onClick={handleForgetPassword} className='text-blue-600 text-sm mt-0.5 cursor-pointer'>Forget Password?</span>
                        </div>
                        <div className='flex gap-5'>
                            <div><LoadCanvasTemplate /></div>
                            <input className='grow p-2' required type="text" name="captcha" placeholder='write here' id="captcha" />
                        </div>
                        {
                            error && <p className='font-semibold text-red-600'>{error}</p>
                        }
                        <div>
                            <input className='text-center my-3 text-warning font-semibold border-b-2 p-2 bg-black hover:text-white hover:bg-orange-400 w-full' type="submit" value="Login" />
                        </div>
                    </form>
                    <div className="divider">or</div>
                    <p className='text-center'>Sign in with</p>
                    <div className='text-center py-2 gap-4 flex items-center justify-center'>
                        <button><img className='w-1/2 mx-auto' title='facebook' src={facebook} alt="" /></button>
                        <button onClick={handleGoogleLogin}><img className='w-1/2 mx-auto' title='google' src={google} alt="" /></button>
                        <button><img className='w-1/2 mx-auto' title='github' src={github} alt="" /></button>
                    </div>
                    <p className=' py-2 text-center'>Sign up with Email Password <Link className='underline text-blue-500' to="/register">Register</Link> ?</p>
                </div>
            </div>
        </>
    );
};

export default Login;