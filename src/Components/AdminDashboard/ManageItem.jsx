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
import toast from 'react-hot-toast';
const imageHostingApiKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;

const ManageItem = () => {
    const [menu, popularItems, , , , , , , loading, refetch] = useMenu();
    const [categoricalItem, setCategoricalItem] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const axiosSecure = useAxiosInterceptor();

    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;


    // This function decleared for setting initial value of category item to check two array are equal
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
        const getSortedItem = event.target.value;
        const sortedItem = menu.filter(item => item.category === getSortedItem);
        setCategoricalItem(sortedItem);
    };

    const handleEditMenuItemButton = item => {
        setEditItem(item);
        // SHOW MODAL FROM HERE 
        document.getElementById('my_modal_4').showModal();
    };

    // Update MenuItem Data Here Which POP UP AS MODAL
    const handleSubmitEditedData = async (event) => {
        const from = event.target;
        const name = from.name.value;
        const price = from.price.value;
        const category = from.category.value;
        const recipe = from.recipe.value;
        const image = from.image.files[0];
        if (image) {
            const formData = new FormData();
            formData.append("image", image);
            await fetch(imageHostingUrl, { method: 'POST', body: formData })
                .then(res => res.json())
                .then(imageRes => {
                    if (imageRes.success) {
                        const imgUrl = imageRes.data.display_url;
                        const updatedItemData = { name, price: parseFloat(price), category, recipe, image: imgUrl };
                        axiosSecure.put(`/menu/${editItem?._id}`, updatedItemData)
                            .then(data => {
                                if (data.data.modifiedCount) {
                                    toast.success('Updated Successfully')
                                    refetch();
                                }
                            })
                    }
                })
        }
        else {
            const updatedItemData = { name, price: parseFloat(price), image: editItem?.image, category, recipe };
            axiosSecure.put(`/menu/${editItem?._id}`, updatedItemData)
                .then(data => {
                    if (data.data.modifiedCount) {
                        toast.success('Updated Successfully');
                        refetch();
                    }
                })
        }
    };

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
        })
    };

    // This function is for cancel modal from UI
    const handleCancel = () => {
        toast('Update Cancelled!');
        window.location.reload();
    };

    if (loading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 md:w-24 text-warning'></span></p>
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
                    <option value="drinks">Drinks</option>
                    <option value="salad">Salad</option>
                    <option value="pizza">Pizza</option>
                    <option value="soup">Soup</option>
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
                                    <td><button title='Edit' onClick={() => handleEditMenuItemButton(item)} className='text-xl text-orange-800 p-2 rounded-full hover:bg-warning'><FaRegEdit></FaRegEdit></button></td>
                                    <th>
                                        <button title='Delete' onClick={() => { handleDeleteItemFromMenu(item._id) }} className='text-xl p-2 rounded-full  hover:bg-error'><FaTrash></FaTrash></button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* MODAL HERE */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <SectionTilte subheading={'-- Put Correct Data --'} heading={'Update A Item'}></SectionTilte>
                    <div className="modal-action">
                        <form onSubmit={handleSubmitEditedData} method='dialog' className='bg-base-200 w-full px-2 py-5 space-y-3 my-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8'>
                                <div>
                                    <label className='font-semibold'>Recipe Name *</label> <br />
                                    <input required defaultValue={editItem?.name} name='name' className='p-2 w-full rounded-sm' type="text" placeholder='Recipe Name Here' id="name" />
                                </div>
                                <div>
                                    <label className='font-semibold'>Availability</label> <br />
                                    <input disabled className='p-2 bg-white w-full rounded-sm' type="text" placeholder='Item Availability' id="availability" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8'>
                                <div>
                                    <label className='font-semibold'>Price *</label> <br />
                                    <input required defaultValue={editItem?.price} name='price' className='p-2 w-full rounded-sm' min='0' step='0.01' type="number" placeholder='Item Price' id="Price" />
                                </div>
                                <div>
                                    <label className='font-semibold'>Category *</label>
                                    <br />
                                    <select value={editItem?.category} required className='px-2 py-2.5 w-full rounded-sm' name="category">
                                        <option value="popular">Popular</option>
                                        <option value="offered">Offered</option>
                                        <option value="drinks">Drinks</option>
                                        <option value="salad">Salad</option>
                                        <option value="pizza">Pizza</option>
                                        <option value="soup">Soup</option>
                                        <option value="dessert">Dessert</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className='font-semibold'>Recipe Details *</label> <br />
                                <textarea required defaultValue={editItem?.recipe} name='recipe' className='p-2 w-full' id="recipeDetails" cols="30" rows="10"></textarea>
                            </div>
                            <div>
                                <label><span className='font-semibold'>Current Photo </span></label>
                                <img className='w-56' src={editItem?.image} alt="" />
                            </div>
                            <div>
                                <label className='font-semibold'>Upload New Photo *</label> <br />
                                <input name='image' type="file" className="file-input file-input-bordered file-input-warning w-full md:w-1/2" />
                            </div>
                            <div className='flex items-center gap-5 justify-center pt-10'>
                                <button type='submit' className='flex gap-2 items-center bg-black text-white hover:bg-orange-400 py-2 px-3 font-semibold'> Update Item <FaUtensils></FaUtensils></button>
                                <button type='button' onClick={handleCancel} className='flex items-center bg-black text-white hover:bg-orange-400 py-2 px-3 font-semibold'> Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ManageItem;