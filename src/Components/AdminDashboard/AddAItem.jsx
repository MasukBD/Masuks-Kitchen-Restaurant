import React from 'react';
import SectionTilte from '../SharedComponent/SectionTilte';
import { Helmet } from 'react-helmet-async';
import { FaUtensils } from 'react-icons/fa6';
import { useForm } from "react-hook-form"
import axios from 'axios';

// Upload image to host site(imgbb) steps here step:: 2 get api key from env file
const imageHostingApiKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;

const AddAItem = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    // Upload image to host site(imgbb) steps here step:: 2 make URL
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

    const onSubmit = (data) => {
        //Upload image to host site(imgbb) steps here step::3 create formdata  
        const formData = new FormData();
        formData.append('image', data.image[0]);

        //Upload image to host site(imgbb) steps here step::4 fetch data via POST method
        fetch(imageHostingUrl, { method: 'POST', body: formData })
            .then(res => res.json())
            .then(imageRes => {
                console.log(imageRes.data.display_url)
            })
    }

    return (
        <div>
            <Helmet><title>Add Item - Masuk's - Kitchen - Restaurant</title></Helmet>
            <SectionTilte subheading={'-- Add A New Item To Menu --'} heading={'Add To Menu'}></SectionTilte>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-base-200 px-2 py-5 space-y-3 my-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8'>
                        <div>
                            <label className='font-semibold'>Recipe Name <span className='text-red-500'>*</span></label> <br />
                            <input {...register("name", { required: true })} className='p-2 w-full rounded-sm' type="text" placeholder='Recipe Name Here' id="name" />
                            {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Availability</label> <br />
                            <input disabled className='p-2 bg-white w-full rounded-sm' type="text" placeholder='Item Availability' id="availability" />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8'>
                        <div>
                            <label className='font-semibold'>Price <span className='text-red-500'>*</span></label> <br />
                            <input {...register("price", { required: true })} className='p-2 w-full rounded-sm' min='0' step='0.01' type="number" placeholder='Item Price' id="Price" />
                            {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Category <span className='text-red-500'>*</span></label> <br />
                            <select required {...register("category", { required: true })} className='px-2 py-2.5 w-full rounded-sm' name="category" id="category">
                                <option value="popular">Popular</option>
                                <option value="offered">Offered</option>
                                <option value="drinks">Drinks</option>
                                <option value="soup">Soup</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="dessert">Dessert</option>
                            </select>
                            {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                    </div>
                    <div>
                        <label className='font-semibold'>Recipe Details <span className='text-red-500'>*</span></label> <br />
                        <textarea {...register("recipe", { required: true })} className='p-2 w-full' id="recipeDetails" cols="30" rows="10"></textarea>
                        {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                    </div>
                    <div>
                        <label className='font-semibold'>Upload Photo <span className='text-red-500'>*</span></label> <br />
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-warning w-full md:w-1/2" /> <br />
                        {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                    </div>
                    <div className='flex items-center justify-center pt-10'>
                        <button className='flex gap-2 items-center bg-black text-white hover:bg-orange-400 py-2 px-3 font-semibold'><input type="submit" value="Add Item" /> <FaUtensils></FaUtensils></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAItem;