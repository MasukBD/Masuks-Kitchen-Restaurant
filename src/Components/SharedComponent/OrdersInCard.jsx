import React from 'react';

const OrdersInCard = ({ order, index }) => {
    const { billAmount, customer, date, itemName, totalItem, transactionId, _id, orderStatus } = order;
    return (
        <div className='border-2 p-2 flex flex-col'>
            <h1 className='text-center text-orange-500 font-semibold text-lg'>Order No: 000{index + 1}</h1>
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
                <h3 className='font-semibold'>Serve Status: <span className='text-orange-500'>{orderStatus}</span></h3>
                <footer><p>Food Will server Within 30 Minutes! Thanks for your Order!</p></footer>
            </div>
        </div>
    );
};

export default OrdersInCard;