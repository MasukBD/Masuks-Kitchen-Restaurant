import React from 'react';
import image1 from '../../../assets/images/chef-says/chef-sys.jpg';
import image2 from '../../../assets/images/chef-says/chef-kitchen-pouring-food.jpg';

const ChefSays = () => {
    return (
        <div className='my-10 relative md:mt-14 md:mb-6 md:w-11/12 mx-auto px-2'>
            <img className='hidden md:block' src={image1} alt="" />
            <img className='md:hidden' src={image2} alt="" />
            <div className='absolute bg-[#1C1A27] text-white bg-opacity-75 inset-0 items-center flex justify-center m-8 lg:m-20'>
                <div className='p-3'>
                    <h2 className='text-4xl font-bold text-center'>Chef Says</h2>
                    <p className='text-center mt-2 text-md'>"In the bustling sanctuary of Masuk's Kitchen, our culinary artisans craft more than just dishes; they compose of flavor. Each plate is a canvas, painted with passion and perfected to tantalize your taste buds. Step into our world, where the alchemy of ingredients transforms into delightful experiences. Here, we believe in more than just a meal – we craft memories, one bite at a time. Welcome, and savor the artistry of our kitchen."</p>
                </div>
            </div>
        </div>
    );
};

export default ChefSays;