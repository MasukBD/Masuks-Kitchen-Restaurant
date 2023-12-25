import React, { useContext } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { HiShoppingCart, HiHome, HiMenuAlt1, HiLogout } from "react-icons/hi";
import { FaCalendarDays, FaWallet, FaCalendarCheck, FaClipboardCheck, FaEnvelope, FaUsers, FaBook, FaUtensils, FaAlignCenter, FaBraille } from "react-icons/fa6";
import { Authcontext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
    const { logOut } = useContext(Authcontext);


    const [, isAdmin,] = useAdmin();

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logout Successfull!');
            })
            .catch(error => {
                toast.error('Something went wrong!')
            })
    }

    return (

        <>
            <Helmet><title>Dashboard | Masuk's Kitchen Restaurent</title></Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="navbar bg-black bg-opacity-80 lg:hidden px-5">
                        <div className="flex-1">
                            <Link to="/" style={{ fontFamily: 'Domine', }} className="text-white hover:text-warning font-semibold"><p><span className='text-sm'>MASUK'S&nbsp;KITCHEN</span> <br /> <span className='text-lg'>RESTAURANT</span></p></Link>
                        </div>
                        <div className="flex-none">
                            <label htmlFor="my-drawer-2" title='Menu' className="text-4xl text-white drawer-button"><HiMenuAlt1></HiMenuAlt1></label>
                        </div>
                    </div>

                    {/* Page content here */}
                    <div className='md:w-11/12 mx-auto p-2'>
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-56 min-h-full bg-yellow-600 space-y-1">
                        {/* Sidebar content here */}
                        <Link to="/" style={{ fontFamily: 'Domine', }} className="text-white hover:text-warning font-semibold my-8"><p><span className='text-sm'>MASUK'S&nbsp;KITCHEN</span> <br /> <span className='text-lg'>RESTAURANT</span></p></Link>
                        {
                            isAdmin ? <>

                                <li><NavLink to="/dashboard/adminHome" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiHome />Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/addItem" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaUtensils></FaUtensils> Add Item</NavLink></li>
                                <li><NavLink to="/dashboard/manageItems" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaAlignCenter></FaAlignCenter> Manage Items</NavLink></li>
                                <li><NavLink to="/dashboard/manageOrders" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaBraille></FaBraille> Manage Orders</NavLink></li>
                                <li><NavLink to="/dashboard/manageBookings" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaBook></FaBook> Manage Bookings</NavLink></li>
                                <li><NavLink to="/dashboard/allUsers" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaUsers></FaUsers> All Users</NavLink></li>
                            </>
                                :
                                <>
                                    <li><NavLink to="/dashboard/userHome" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiHome /> User Home</NavLink></li>
                                    <li><NavLink to="/dashboard/reservation" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaCalendarDays></FaCalendarDays> Reservation</NavLink></li>
                                    <li><NavLink to="/dashboard/orders" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaWallet></FaWallet> Order History</NavLink></li>
                                    <li><NavLink to="/dashboard/myCart" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiShoppingCart /> My Cart</NavLink></li>
                                    <li><NavLink to="/dashboard/addReview" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaClipboardCheck></FaClipboardCheck> Add Review</NavLink></li>
                                    <li><NavLink to="/dashboard/myBookings" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaCalendarCheck></FaCalendarCheck> My Bookings</NavLink></li>
                                </>
                        }

                        <div className='divider'></div>

                        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiHome /> Home Page</NavLink></li>
                        <li><NavLink to="/menu" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiMenuAlt1 /> Menu</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaEnvelope /> Contact</NavLink></li>
                        <li><button onClick={handleLogout} className='default'><HiLogout></HiLogout> LogOut</button></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;