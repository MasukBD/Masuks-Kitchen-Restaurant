import React from 'react';
import { Link } from 'react-router-dom';

const ItemShowInCard = ({ item }) => {
    const { _id, name, image, recipe, price } = item;
    return (
        <div className='relative shadow-lg flex flex-col text-center shadow-orange-100 border'>
            <img src={image} alt="" />
            <h3 className='absolute right-2 top-2 font-semibold text-warning bg-gradient-to-r from-green-600 to-black p-1 rounded-md'>${price}</h3>
            <h2 className='text-2xl font-semibold my-2'>{name}</h2>
            <p className='mb-2'>{recipe}</p>
            <Link className='mt-auto mb-5' to=""><button className='border-b-2 py-1 px-2 border-orange-500 text-warning hover:bg-black font-semibold'>Add To Cart</button></Link>
        </div>
    );
};

export default ItemShowInCard;