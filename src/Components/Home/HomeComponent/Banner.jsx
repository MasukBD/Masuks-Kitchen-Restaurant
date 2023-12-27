import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../../assets/images/banner/1.png';
import image2 from '../../../assets/images/banner/2.png';
import image3 from '../../../assets/images/banner/3.png';
import image4 from '../../../assets/images/banner/4.png';
import image5 from '../../../assets/images/banner/5.png';

const Banner = () => {
    return (
        <Carousel className='text-center' autoPlay interval={3000} infiniteLoop>
            <div>
                <img src={image1} />
            </div>
            <div>
                <img src={image2} />
            </div>
            <div>
                <img src={image3} />
            </div>
            <div>
                <img src={image4} />
            </div>
            <div>
                <img src={image5} />
            </div>
        </Carousel>
    );
};

export default Banner;