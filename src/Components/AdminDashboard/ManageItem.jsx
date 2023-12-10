import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionCover from '../SharedComponent/SectionCover';
import image from '../../assets/images/menu-page/banner.jpg';
import useMenu from '../../Hooks/UseMenu';
import { FaRegEdit, FaUtensils } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';
import SectionTilte from '../SharedComponent/SectionTilte';
import { useForm } from 'react-hook-form';

const ManageItem = () => {
    const [menu, popularItems, , , , , , , loading, refetch] = useMenu();
    const [categoricalItem, setCategoricalItem] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const axiosSecure = useAxiosInterceptor();


    // This function decleared for setting initial value of category item 
    function arraysAreEqual(array1, array2) {
        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }

        return true;
    }

    useEffect(() => {
        if (!arraysAreEqual(popularItems, categoricalItem)) {
            setCategoricalItem(popularItems);
        }
    }, [menu]);

    const handleSort = event => {
        const sortedData = event.target.value;
        const sortedItem = menu.filter(item => item.category === sortedData);
        setCategoricalItem(sortedItem);
    };

    const handleEditMenuItem = item => {
        setEditItem(item);
        console.log(item._id)
        document.getElementById('my_modal_4').showModal();
    };

    const onSubmit = data => {
        console.log(data);
    }

    const handleDeleteItemFromMenu = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <>
            <Helmet><title>Manage Items | Masuk's Kitchen Restaurant</title></Helmet>
            <SectionCover image={image} subHeading={'Revitalize customer dining experience with updated restaurant menu, featuring a tantalizing array of new culinary creations and time-tested favorites, meticulously crafted to satisfy every palate.'} heading={'Update Menu Page'}></SectionCover>
            <div className='my-5 w-2/3 md:w-1/3 flex flex-col ml-auto'>
                <label className='font-semibold'>Sort By Category</label>
                <select onChange={handleSort} className='p-2 border-warning border-2 rounded-md' name="category" id="category">
                    <option value="popular">Popular</option>
                    <option value="offered">Offered</option>
                    <option value="salad">Salad</option>
                    <option value="drinks">Drinks</option>
                    <option value="soup">Soup</option>
                    <option value="pizza">Pizza</option>
                    <option value="dessert">Dessert</option>
                </select>
            </div>
            <div className='my-4 gap-2 flex justify-between flex-col md:flex-row'>
                <h3 style={{ fontFamily: 'Domine', }} className='text-xl font-semibold'>Total Item : <span className='text-orange-500'>{menu.length}</span></h3>
                <h3 style={{ fontFamily: 'Domine', }} className='text-xl font-semibold'>{categoricalItem[0]?.category} item: <span className='text-orange-500'>{categoricalItem.length}</span></h3>
            </div>
            <div className='my-7 md:my-10 bg-slate-100'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-warning text-white text-center'>
                            <tr>
                                <th>Sl</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='text-center font-semibold'>
                            {
                                categoricalItem.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td className='flex justify-center'><img className='w-12 rounded-md hover:scale-150 transition duration-500' src={item.image} alt="" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td><button onClick={() => handleEditMenuItem(item)} className='text-xl text-orange-800 p-2 rounded-full hover:bg-warning'><FaRegEdit></FaRegEdit></button></td>
                                    <th>
                                        <button onClick={() => { handleDeleteItemFromMenu(item._id) }} className='text-xl p-2 rounded-full  hover:bg-error'><FaTrash></FaTrash></button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <SectionTilte subheading={'-- Put Correct Data --'} heading={'Update A Item'}></SectionTilte>
                    <div className="modal-action">
                        <form method='dialog' onSubmit={handleSubmit(onSubmit)} className='bg-base-200 w-full px-2 py-5 space-y-3 my-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8'>
                                <div>
                                    <label className='font-semibold'>Recipe Name *</label> <br />
                                    <input defaultValue={editItem?.name} {...register("name")} className='p-2 w-full rounded-sm' type="text" placeholder='Recipe Name Here' id="name" />
                                </div>
                                <div>
                                    <label className='font-semibold'>Availability</label> <br />
                                    <input disabled className='p-2 bg-white w-full rounded-sm' type="text" placeholder='Item Availability' id="availability" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8'>
                                <div>
                                    <label className='font-semibold'>Price *</label> <br />
                                    <input defaultValue={editItem?.price} {...register("price")} className='p-2 w-full rounded-sm' min='0' step='0.01' type="number" placeholder='Item Price' id="Price" />
                                </div>
                                <div>
                                    <label className='font-semibold'>Category *</label> <br />
                                    <select defaultValue={editItem?.category} {...register("category")} className='px-2 py-2.5 w-full rounded-sm' name="category" id="category">
                                        <option value="popular">Popular</option>
                                        <option value="offered">Offered</option>
                                        <option value="drinks">Drinks</option>
                                        <option value="soup">Soup</option>
                                        <option value="salad">Salad</option>
                                        <option value="pizza">Pizza</option>
                                        <option value="dessert">Dessert</option>
                                    </select>

                                </div>
                            </div>
                            <div>
                                <label className='font-semibold'>Recipe Details *</label> <br />
                                <textarea defaultValue={editItem?.recipe} {...register("recipe")} className='p-2 w-full' id="recipeDetails" cols="30" rows="10"></textarea>
                            </div>
                            <div>
                                <label className='font-semibold'>Upload New Photo *</label> <br />
                                <input {...register("image")} type="file" className="file-input file-input-bordered file-input-warning w-full md:w-1/2" />
                            </div>
                            <div className='flex items-center justify-center pt-10'>
                                <button disabled={btnLoader} className='flex gap-2 items-center bg-black text-white hover:bg-orange-400 py-2 px-3 font-semibold'> {btnLoader ? 'Updating...' : 'Update Item'} <FaUtensils></FaUtensils></button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ManageItem;