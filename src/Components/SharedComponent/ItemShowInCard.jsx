import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const ItemShowInCard = ({ item }) => {
    const { _id, name, image, recipe, price } = item;
    const { user } = useContext(Authcontext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = () => {
        if (user && user.email) {
            const orderItem = { foodItemId: _id, foodName: name, foodImg: image, price, email: user.email };
            fetch('http://localhost:5000/carts', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orderItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        toast.success('Item Added To Cart!')
                    }
                })
        }
        else {
            navigate('/login', { state: { from: location } });
        }
    }
    return (
        <div className='relative shadow-lg flex flex-col text-center shadow-orange-100 border'>
            <img src={image} alt="" />
            <h3 className='absolute right-2 top-2 font-semibold text-warning bg-gradient-to-r from-green-600 to-black p-1 rounded-md'>${price}</h3>
            <h2 className='text-2xl font-semibold my-2'>{name}</h2>
            <p className='mb-2'>{recipe}</p>
            <Link className='mt-auto mb-5' to=""><button onClick={handleAddToCart} className='border-b-2 py-1 px-2 border-orange-500 text-warning hover:bg-black font-semibold'>Add To Cart</button></Link>
        </div>
    );
};

export default ItemShowInCard;