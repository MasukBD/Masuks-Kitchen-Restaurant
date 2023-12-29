import React, { useEffect, useState } from 'react';
import SectionTilte from '../../SharedComponent/SectionTilte';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// React Ratings (react awsome componet) 
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import { FaQuoteLeft } from 'react-icons/fa';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://masuk-kitchen-server.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <div className='my-10 md:w-11/12 mx-auto'>
            <SectionTilte heading={"Customer Review's"} subheading={"-- Rate Us --"}></SectionTilte>
            <div className='my-5'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                >
                    {
                        [...reviews].reverse().slice(0, 6).map(review => <SwiperSlide key={review._id}>
                            <div className='text-center flex flex-col justify-center items-center py-5 px-8 md:px-12 space-y-2'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <FaQuoteLeft className='my-6 text-7xl'></FaQuoteLeft>
                                <h3>{review.name}</h3>
                                <p>{review.details}</p>
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;