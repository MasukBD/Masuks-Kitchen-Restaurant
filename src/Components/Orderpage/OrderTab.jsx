import React from 'react';
import ItemShowInCard from '../SharedComponent/ItemShowInCard';

const OrderTab = ({ items }) => {
    return (
        <div className='my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7'>
            {
                items.map(item => <ItemShowInCard key={item._id} item={item}></ItemShowInCard>)
            }
        </div>
    );
};

export default OrderTab;