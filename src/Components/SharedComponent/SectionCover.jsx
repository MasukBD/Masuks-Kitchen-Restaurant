import React from 'react';

const SectionCover = ({ image, heading, subHeading }) => {
    return (
        <div className='relative'>
            <img src={image} alt="" />
            <div className='absolute bg-black bg-opacity-70 mx-14 my-6 md:my-20 md:mx-20 inset-0 flex flex-col items-center justify-center text-center text-white space-y-3'>
                <h2 className='text-3xl md:text-5xl font-semibold'>{heading}</h2>
                <p className='font-semibold w-11/12 md:w-1/2 mx-auto hidden md:block'>{subHeading}</p>
            </div>
        </div>
    );
};

export default SectionCover;