import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionCover from '../SharedComponent/SectionCover';
import image from '../../assets/images/menu-page/banner.jpg';
import useMenu from '../../Hooks/UseMenu';
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosInterceptor from '../../Hooks/useAxiosInterceptor';

const ManageItem = () => {
    const [menu, popularItems, , , , , , , loading, refetch] = useMenu();
    const [displayItem, setDisplayItem] = useState([]);
    const axiosSecure = useAxiosInterceptor();

    useEffect(() => {
        setDisplayItem(popularItems)
    }, [menu])

    const handleSort = event => {
        const sortedData = event.target.value;
        const sortedItem = menu.filter(item => item.category === sortedData);
        setDisplayItem(sortedItem);
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
                <h3 style={{ fontFamily: 'Domine', }} className='text-xl font-semibold'>{displayItem[0]?.category} Item: <span className='text-orange-500'>{displayItem.length}</span></h3>
            </div>
            <div className="overflow-x-auto my-7 md:my-10 bg-slate-100">
                <table className="table">
                    {/* head */}
                    <thead className='bg-warning text-white text-center'>
                        <tr>
                            <th>Sl</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-center font-semibold'>
                        {
                            displayItem.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td className='flex justify-center'><img className='w-12 rounded-md hover:scale-150 transition duration-500' src={item.image} alt="" /></td>
                                <td>{item.name}</td>
                                <td><button className='text-xl text-orange-800 p-2 rounded-full hover:bg-warning'><FaRegEdit></FaRegEdit></button></td>
                                <th>
                                    <button onClick={() => { handleDeleteItemFromMenu(item._id) }} className='text-xl p-2 rounded-full  hover:bg-error'><FaTrash></FaTrash></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageItem;