import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTilte from '../SharedComponent/SectionTilte';
import useOrders from '../../Hooks/useOrders';
import OrdersInCard from '../SharedComponent/OrdersInCard';

const OrderHistory = () => {
    const [orders, , isLoading] = useOrders();
    if (isLoading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 md:w-24 text-warning'></span></p>;
    }
    return (
        <>
            <Helmet><title>Orders | Masuk's Kitchen Restaurant</title></Helmet>
            <SectionTilte subheading={"-- Order List --"} heading={'Just Caught Up Here'}></SectionTilte>
            {
                orders.length <= 0 && <h2 className='text-center text-error font-semibold text-lg md:text-3xl my-5 md:my-10'>No order has been placed Yet!</h2>
            }
            <div className='my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    orders.map((order, index) => <OrdersInCard key={order._id} index={index} order={order}></OrdersInCard>)
                }
            </div>
        </>
    );
};

export default OrderHistory;