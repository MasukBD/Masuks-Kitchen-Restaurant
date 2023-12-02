import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTilte from '../SharedComponent/SectionTilte';
import { Link } from 'react-router-dom';
import useCart from '../../Hooks/useCart';
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

const CartItem = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

    const handleCartItemDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "One cart item removed.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <>
            <Helmet><title>My Cart | Masuk's Kitchen Restuarant</title></Helmet>
            <div className='p-2'>
                <SectionTilte subheading={'-- No Late to Get --'} heading={'Your Cart Item!'}></SectionTilte>
                <p className='text-center'><Link to='/order/popular'><button className='border-b-2 py-1 px-2 text-white hover:bg-orange-700 border-black bg-orange-400 font-semibold mb-5'>Order More</button></Link></p>
                <div className='bg-gray-100 p-6 md:p-10'>
                    <div style={{ fontFamily: 'Domine', }} className='flex items-center flex-wrap md:flex-nowrap justify-between mb-6'>
                        <p className='font-semibold text-lg md:text-xl'>Total Items: <span className='text-orange-500'>{cart?.length}</span></p>
                        <p className='font-semibold text-lg md:text-xl'>Total Price: <span className='text-orange-500'>$ {cart && totalPrice}</span></p>
                        <Link to=""><button className='bg-orange-500 py-1 px-2 rounded text-white font-semibold'>Pay</button></Link>
                    </div>
                    <div className="overflow-x-auto bg-white my-4">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Image</th>
                                    <th>Food Name</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <img className='w-16 rounded-md' src={item.foodImg} alt="" />
                                    </td>
                                    <td>
                                        <span className='font-semibold'>{item.foodName}</span>
                                    </td>
                                    <td className='font-semibold text-orange-500'>$&nbsp;{item.price}</td>
                                    <th>
                                        <button onClick={() => handleCartItemDelete(item._id)} className="btn-error btn-outline rounded-full p-2 text-2xl"><FaTrashAlt></FaTrashAlt></button>
                                    </th>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    cart.length === 0 && <p className='text-center font-semibold my-2 text-error'>No Item Added Yet!</p>
                }
            </div>
        </>
    );
};

export default CartItem;