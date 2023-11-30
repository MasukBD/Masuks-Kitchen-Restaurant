import React from 'react';
import SectionTilte from '../../SharedComponent/SectionTilte';
import image from '../../../assets/images/highlighted/highlighted.jpg';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';


const Highlighted = () => {
    return (
        <div className="my-10 md:my-20 bg-fixed md:w-11/12 text-white mx-auto p-2 bg-[url('/highlighted.jpg')]">
            <div className='bg-black bg-opacity-50 md:pt-1'>
                <SectionTilte subheading={"-- check Out Now --"} heading={'Daily Special Meal'}></SectionTilte>
                <div className='md:flex items-center justify-center gap-10 px-8 py-2 md:px-20 md:py-5'>
                    <div>
                        <img src={image} alt="" />
                    </div>
                    <div className='space-y-2 mt-4 md:mt-0'>
                        <p className='font-semibold'>{moment().format('MMMM Do, YYYY')}</p>
                        <p className='uppercase text-sm font-semibold'>You Will Feel Something Special in you!</p>
                        <p>Grilled Salmon with Lemon Herb Butter is a delectable dish featuring perfectly grilled salmon seasoned with dill, parsley, and thyme. The star is the luscious Lemon Herb Butter, infused with zesty lemon juice. Served with grilled asparagus and fluffy quinoa, the dish is visually stunning.</p>
                        <Link to='/order/popular'><button className='border-b-2 py-1 px-2 hover:border-black border-white hover:bg-orange-400 font-semibold mt-2'>Order Now</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Highlighted;