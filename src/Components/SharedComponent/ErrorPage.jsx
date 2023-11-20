import React from 'react';
import image from '../../assets/images/errorpage/errorPage.png';

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <img className='md:w-1/3' src={image} alt="" />
        </div>
    );
};

export default ErrorPage;