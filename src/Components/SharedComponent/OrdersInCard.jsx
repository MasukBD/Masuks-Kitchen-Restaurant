import React from 'react';
import { Link } from 'react-router-dom';

const OrdersInCard = ({ order }) => {
    const { billAmount, customer, date, itemName, totalItem, transactionId, _id, orderStatus, orderNumber } = order;
    return (
        <div className='border-2 p-2 flex flex-col'>
            <h1 className='text-center text-orange-500 font-semibold text-lg'>Order No:{orderNumber}</h1>
            <p className='text-center text-xs'>Order Id: {_id}</p>
            <p className='text-sm text-center'>Date: {date}</p>
            <h3 className='mt-3 mb-1 text-center font-semibold text-lg underline text-orange-500'>Order Items : <span>{totalItem}</span></h3>
            <ol className='mb-3'>
                {
                    itemName.map((item, i) => <li key={i} className='font-semibold'> {<span>{i + 1}</span>}. {item}</li>)
                }
            </ol>
            <div className='mt-auto space-y-2'>
                <div className='flex justify-between'>
                    <h3>Biling Amount: <span className='text-orange-500 font-semibold'>{billAmount}</span></h3>
                    <h3>Status: <span className='text-orange-500 font-semibold'>Paid</span></h3>
                </div>
                <h4 className='text-sm mt-4'>TranxId: {transactionId}</h4>
                <h3 className='font-semibold'>Order Status: <span className='text-orange-500'>{orderStatus}</span></h3>
                <footer><p>Food Will server Within 30 Minutes! Thanks for your Order!</p></footer>
            </div>
            <button className='btn btn-outline btn-warning mt-4'><Link to='/dashboard/addReview'>Add Review</Link></button>
        </div>
    );
};

export default OrdersInCard;