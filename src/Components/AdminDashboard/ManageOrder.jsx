import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionCover from '../SharedComponent/SectionCover';
import image from '../../assets/images/mange-order/serve-food.jpg';
import useOrders from '../../Hooks/useOrders';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import Swal from 'sweetalert2';

const ManageOrder = () => {

    const [orders, refetch, isLoading] = useOrders();
    const axiosSecure = useAxiosInterceptor();

    // SweetAlert Variable 
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });


    const handleChangeOrderStatus = (id) => {
        const status = 'served';
        axiosSecure.patch(`/orders/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount) {
                    Toast.fire({
                        icon: "success",
                        title: "Food Served To Delivery Man!"
                    });
                    refetch();
                }
            })
    }
    return (
        <>
            <Helmet><title>Manage Orders - Masuk's - Kitchen - Restaurant</title></Helmet>
            <SectionCover image={image} heading={'Manage Order'} subHeading={'Our kitchen team is crafting a masterpiece just for you. Your patience fuels our passion, and we cant wait to deliver a dining experience that exceeds customers expectations!'}></SectionCover>
            <div className='my-10'>
                <h1 style={{ fontFamily: 'Domine' }} className='text-center text-lg font-semibold my-3'>Order List </h1>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead className='bg-warning text-black py-1'>
                            <tr>
                                <th>#</th>
                                <th>Order No.</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Trnx Id</th>
                                <th>Customer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [...orders].reverse().map((order, i) => <tr className='hover' key={order._id}>
                                    <th>{i + 1}</th>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <ul>
                                            {
                                                order.itemName.map((item, i) => <li key={i}><span>{i + 1}.</span>{item}</li>)
                                            }
                                        </ul>
                                    </td>
                                    <td>{order.transactionId}</td>
                                    <td>{order.customer}</td>
                                    <td><button className={order.orderStatus == 'Pending' ? 'text-error font-semibold' : 'text-black font-semibold'} disabled={order.orderStatus === 'served'} onClick={() => handleChangeOrderStatus(order._id)}>{order.orderStatus}</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageOrder;