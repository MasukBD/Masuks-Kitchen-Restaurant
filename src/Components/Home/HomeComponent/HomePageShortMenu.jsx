import React, { useEffect, useState } from 'react';
import SectionTilte from '../../SharedComponent/SectionTilte';
import ItemShow from '../../SharedComponent/ItemShow';
import { Link } from 'react-router-dom';

const HomePageShortMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('/menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItem = data.filter(item => item.category === 'popular');
                setMenu(popularItem);
            })
    }, [])
    return (
        <div className='w-full p-2 md:w-11/12 mx-auto'>
            <SectionTilte subheading={"--Taste The Real Savory--"} heading={"Explore Special Menu"}></SectionTilte>
            <div className='my-2 grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    menu.map(item => <ItemShow key={item._id} item={item}></ItemShow>)
                }
            </div>
            <p className='text-center'><Link to=""><button className='mb-8 mt-5 border-black border-b-2 font-semibold '>View Full Menu</button></Link></p>
        </div>
    );
};

export default HomePageShortMenu;