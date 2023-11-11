import React from 'react';
import { Link } from 'react-router-dom';

const ItemShowInCard = ({ item }) => {
    const { _id, name, image, recipe } = item;
    return (
        <div className='shadow-lg text-center shadow-orange-100 border'>
            <img src={image} alt="" />
            <h2 className='text-2xl font-semibold my-2'>{name}</h2>
            <p className='mb-2'>{recipe}</p>
            <Link className='text-center flex flex-col' to=""><button className='border-b-2 w-5/12 py-1 mb-5 mx-auto border-orange-500 text-warning hover:bg-black font-semibold'>Add To Cart</button></Link>
        </div>
    );
};

export default ItemShowInCard;