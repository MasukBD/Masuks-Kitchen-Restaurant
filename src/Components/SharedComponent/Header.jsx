import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Authcontext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Header = () => {

    const { user, logOut } = useContext(Authcontext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logout Successfull!')
            })
            .catch(error => {
                toast.error('Something went wrong!')
            })
    }

    const navItem = <>
        {
            user && <span className='font-semibold md:pr-20 text-white '>{user.displayName ? user.displayName : "User"}</span>
        }
        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'default')}>Home</NavLink></li>
        <li><NavLink to="/menu" className={({ isActive }) => (isActive ? 'active' : 'default')}>Menu</NavLink></li>
        <li><NavLink to="/order/popular" className={({ isActive }) => (isActive ? 'active' : 'default')}>Order</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : 'default')}>Contact&nbsp;Us</NavLink></li>
        {
            user ? <button onClick={handleLogout} className='default'>Logout</button> : <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : 'default')}>LogIn</NavLink></li>
        }
    </>
    return (
        <div className="navbar ps-7 md:px-14 bg-[#1C1A27] md:bg-black md:bg-opacity-70 md:fixed z-10">
            <Link to="/" style={{ fontFamily: 'Domine', }} className="text-white hover:text-warning font-semibold"><p><span className='text-sm'>MASUK'S&nbsp;KITCHEN</span> <br /> <span className='text-lg'>RESTAURANT</span></p></Link>
            <div className="navbar-end">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost pe-10 text-white lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="bg-black bg-opacity-80 dropdown-content mt-2 p-2 z-10 shadow rounded">
                        {navItem}
                    </ul>
                </div>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="flex items-center">
                    {navItem}
                </ul>
            </div>
        </div>
    );
};

export default Header;