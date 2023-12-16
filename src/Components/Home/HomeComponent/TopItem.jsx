import React from 'react';
import SectionTilte from '../../SharedComponent/SectionTilte';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

import { FaArrowRight, FaBeer } from 'react-icons/fa';

import slide1 from '../../../assets/images/top-item/slide-1.jpg';
import slide2 from '../../../assets/images/top-item/slide-2.jpg';
import slide3 from '../../../assets/images/top-item/slide-3.jpg';
import slide4 from '../../../assets/images/top-item/slide-4.jpg';
import slide5 from '../../../assets/images/top-item/slide-5.jpg';
import slide6 from '../../../assets/images/top-item/slide-6.jpg';
import slide7 from '../../../assets/images/top-item/slide-7.jpg';
import { Link } from 'react-router-dom';

const TopItem = () => {
    return (
        <>
            <SectionTilte subheading={"Items Choose By Foodie People"} heading={"Most Popular Items"}></SectionTilte>
            <div className='md:w-11/12 p-2 mx-auto mb-10 md:mb-16'>
                <Swiper
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        540: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        992: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        }
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={slide1} alt="" />
                        <Link to="/order/pizza"><h3 className='topItem'>Pizza</h3></Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide2} alt="" />
                        <Link to="/order/popular"><h3 className='topItem'>Tacos</h3></Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide3} alt="" />
                        <Link to="/order/offered"><h3 className='topItem'>Stack</h3></Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide4} alt="" />
                        <Link to="/order/pizza"><h3 className='topItem'>Burger</h3></Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide5} alt="" />
                        <Link to="/order/popular"><h3 className='topItem'>Sandwich</h3></Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide6} alt="" />
                        <Link to="/order/salad"><h3 className='topItem'>Salad</h3></Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide7} alt="" />
                        <Link to="/order/dessert"><h3 className='topItem'>Pastie</h3></Link>
                    </SwiperSlide>
                    <SwiperSlide className='relative'>
                        <img src={slide1} alt="" />
                        <Link to="/menu"><h2 className='text-lg absolute inset-0 text-white md:text-3xl font-semibold flex items-center hover:underline underline-offset-4 hover:text-warning justify-center gap-1'>Explore More <FaArrowRight></FaArrowRight></h2></Link>
                    </SwiperSlide>
                </Swiper>
            </div >
        </>
    );
};

export default TopItem;