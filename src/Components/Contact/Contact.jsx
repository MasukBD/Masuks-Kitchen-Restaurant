import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionCover from '../SharedComponent/SectionCover';
import img from '../../assets/images/contact-us/contact.jpg';
import SectionTilte from '../SharedComponent/SectionTilte';
import HomePageContacts from '../Home/HomeComponent/HomePageContacts';
import { Authcontext } from '../../Provider/AuthProvider';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const { user } = useContext(Authcontext);
    return (
        <>
            <Helmet><title>Contact || Masuk's Kitchen Restaurant</title></Helmet>
            <div className='min-h-screen'>
                <SectionCover image={img} subHeading={"We value your feedback and are committed to making your experience with us as smooth as possible. Whether it's a question about our products/services or general feedback, your communication is important to us."} heading={"Contact Us"}></SectionCover>

                {/* details address  */}
                <>
                    <SectionTilte subheading={'-- Visit Shop --'} heading={'Shop Address Info'}></SectionTilte>
                    <HomePageContacts></HomePageContacts>
                </>
                {/* Contact form  */}
                <>
                    <SectionTilte subheading={"-- Keep In Touch --"} heading={"Contact Form"}></SectionTilte>
                    <div className='md:w-11/12 mx-auto p-2 bg-gray-100'>
                        <form className='my-10 md:my-16 mx-3 md:mx-14 space-y-3'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
                                <div>
                                    <label className='font-semibold' htmlFor="">Name*</label><br />
                                    <input className='w-full p-2' required defaultValue={user ? user.displayName : ""} placeholder='Enter Your Name' type="text" name="name" id="name" />
                                </div>
                                <div>
                                    <label className='font-semibold' htmlFor="">Email*</label><br />
                                    <input className='w-full p-2' required defaultValue={user ? user.email : ""} placeholder='Enter Your Email' type="email" name="email" id="email" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
                                <div>
                                    <label className='font-semibold' htmlFor="">Phone*</label><br />
                                    <input className='w-full p-2' title='format: 123 456 7890' pattern="[0-9]{3} [0-9]{3} [0-9]{4}" required defaultValue={user ? user.phoneNumber : ""} placeholder='Enter Your Phone Number' type="tel" name="phone" id="phone" />
                                </div>
                                <div>
                                    <label className='font-semibold' htmlFor="">Category*</label><br />
                                    <select required className='w-full px-2 py-2.5' name="category" id="category">
                                        <option disabled selected value="options">Select Your Options</option>
                                        <option value="complain">Complain</option>
                                        <option value="quries">Quries</option>
                                        <option value="suggestion">Suggestions</option>
                                        <option value="reservation">Reservation</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className='font-semibold' htmlFor="">Message*</label> <br />
                                <textarea className='p-2 w-full' required name="message" id="message" cols="30" rows="10"></textarea>
                            </div>
                            <div>
                                {/* TODO  */}
                                {/* Recapthca */}
                            </div>
                            <div className='flex items-center justify-center pt-10'>
                                <button className='flex gap-2 items-center bg-black text-white hover:bg-orange-400 py-2 px-3 font-semibold'><input type="submit" value="Send Message" /> <FaPaperPlane></FaPaperPlane></button>
                            </div>
                        </form>
                    </div>
                </>
            </div>
        </>
    );
};

export default Contact;