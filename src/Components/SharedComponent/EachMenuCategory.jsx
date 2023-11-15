import React from 'react';
import ItemShow from './ItemShow';
import { Link } from 'react-router-dom';

const EachMenuCategory = ({ menu, category }) => {
    return (
        <>
            <div className='my-2 mt-5 grid grid-cols-1 md:grid-cols-2 gap-8 md:w-11/12 p-2 mx-auto'>
                {
                    menu.map(item => <ItemShow key={item._id} item={item}></ItemShow>)
                }
            </div>
            <p className='text-center mt-5'><Link to={`/order/${category}`}><button className='mb-8 mt-5 border-black border-b-2 font-semibold '>Order Now</button></Link></p>
        </>

    );
};

export default EachMenuCategory;