import React, { useEffect, useState } from 'react';
import SectionTilte from '../../SharedComponent/SectionTilte';
import ItemShowInCard from '../../SharedComponent/ItemShowInCard';

const ChefRecomended = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('/menu.json')
            .then(res => res.json())
            .then(data => {
                const offered = data.filter(item => item.category === "offered");
                setMenu(offered);
            })
    }, []);

    return (
        <div className='md:w-11/12 mx-auto my-3 p-2'>
            <SectionTilte subheading={"-- Feel Something Special --"} heading={"Chef Recommend's"}></SectionTilte>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {
                    menu.length > 0 && menu.map(item => <ItemShowInCard key={item._id} item={item}></ItemShowInCard>)
                }
            </div>
        </div>
    );
};

export default ChefRecomended;