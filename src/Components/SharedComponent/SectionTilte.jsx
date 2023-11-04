import React from 'react';

const SectionTilte = ({ subheading, heading }) => {
    return (
        <div className='w-11/12 md:w-4/12 mx-auto text-center mt-10 md:mt-16 mb-5'>
            <p className='text-orange-400'>{subheading}</p>
            <h3 className='text-2xl md:text-3xl border-y-2 my-2 py-3 font-semibold'>{heading}</h3>
        </div>
    );
};

export default SectionTilte;