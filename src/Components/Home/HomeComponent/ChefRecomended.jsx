import React from 'react';
import SectionTilte from '../../SharedComponent/SectionTilte';
import ItemShowInCard from '../../SharedComponent/ItemShowInCard';
import useMenu from '../../../Hooks/UseMenu';

const ChefRecomended = () => {
    const [menu, loading] = useMenu();
    const offered = menu.filter(item => item.category === "offered");

    return (
        <div className='md:w-11/12 mx-auto my-3 p-2'>
            <SectionTilte subheading={"-- Feel Something Special --"} heading={"Chef Recommend's"}></SectionTilte>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {
                    offered.length > 0 && offered.map(item => <ItemShowInCard key={item._id} item={item}></ItemShowInCard>)
                }
            </div>
        </div>
    );
};

export default ChefRecomended;