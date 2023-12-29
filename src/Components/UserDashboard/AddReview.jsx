import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionCover from '../SharedComponent/SectionCover';
import image from '../../assets/images/review/review.jpg';
import image2 from '../../assets/images/review/review1.jpg';
import { Authcontext } from '../../Provider/AuthProvider';
import { Rating } from '@smastrom/react-rating';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import Swal from 'sweetalert2';

const AddReview = () => {
    const { user } = useContext(Authcontext);
    const [rating, setRating] = useState(null);
    const axiosSecure = useAxiosInterceptor();


    const handleReview = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const rate = form.rate.value;
        const details = form.details.value;
        const review = { name, details, rating: parseFloat(rate) };
        axiosSecure.post('/reviews', review)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank's For Your Feedback!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })
    }

    return (
        <>
            <Helmet><title>Add Review | Masuk's Kitchen Restaurant</title></Helmet>
            <SectionCover subHeading={'Indulge your taste buds and share the joy – rate our food today! Your feedback flavors our journey, making every bite better for all.'} image={image} heading={'Empower with Ratings'}></SectionCover>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
                <div>
                    <img src={image2} alt="" />
                </div>
                <div className='border-2 border-slate-500 rounded-lg p-2'>
                    <form onSubmit={handleReview} className='space-y-3'>
                        <div>
                            <label className='font-semibold' htmlFor="">Your Name</label><br />
                            <input defaultValue={user.displayName} className='w-full p-2 bg-orange-100 rounded' type="text" required name="name" placeholder='Please Enter Name' id="name" />
                        </div>
                        <div>
                            <label className='font-semibold'>Rate</label> <br />
                            <input defaultValue={rating && rating} required name='rate' className='bg-orange-100 rounded p-2 w-full' min='1' step='0.10' type="number" placeholder='Ratings' id="rate" />
                            <div className='flex gap-3'>
                                <small>Rate between 1 to 5 </small>
                                <Rating
                                    style={{ maxWidth: 80 }}
                                    value={rating}
                                    onChange={setRating}
                                    highlightOnlySelected
                                />
                            </div>
                        </div>
                        <div>
                            <label className='font-semibold'>Details</label> <br />
                            <textarea className='bg-orange-100 w-full p-2' required placeholder='Write Your Details Review' name="details" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className='mt-10'>
                            <input className='text-center text-warning font-semibold border-b-2 p-2 bg-black hover:text-white hover:bg-orange-400 w-full' type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddReview;