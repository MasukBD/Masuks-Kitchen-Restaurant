import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionCover from '../SharedComponent/SectionCover';
import img from '../../assets/images/contact-us/contact.jpg';
import SectionTilte from '../SharedComponent/SectionTilte';
import HomePageContacts from '../Home/HomeComponent/HomePageContacts';

const Contact = () => {
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
                </>
            </div>
        </>
    );
};

export default Contact;