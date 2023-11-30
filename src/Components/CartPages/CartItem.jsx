import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTilte from '../SharedComponent/SectionTilte';
import { Link } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

const CartItem = () => {
    const [cart] = useCart();
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
    return (
        <>
            <Helmet><title>My Cart | Masuk's Kitchen Restuarant</title></Helmet>
            <div className='p-2'>
                <SectionTilte subheading={'-- No Late to Get --'} heading={'Your Cart Item!'}></SectionTilte>
                <p className='text-center'><Link to='/order/popular'><button className='border-b-2 py-1 px-2 text-white hover:bg-orange-700 border-black bg-orange-400 font-semibold mb-5'>Order More</button></Link></p>
                <div className='bg-gray-100 p-6 md:p-10'>
                    <div style={{ fontFamily: 'Domine', }} className='flex items-center flex-wrap justify-between'>
                        <p className='font-semibold text-xl'>Total Items: <span className='text-orange-500'>{cart?.length}</span></p>
                        <p className='font-semibold text-xl'>Total Price: <span className='text-orange-500'>$ {cart && totalPrice}</span></p>
                        <Link to=""><button className='bg-orange-500 py-1 px-2 rounded text-white font-semibold'>Pay</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartItem;