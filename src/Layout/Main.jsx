import React from 'react';
import Header from '../Components/SharedComponent/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/SharedComponent/Footer';
import ScrollToTop from '../Components/SharedComponent/ScrollToTop';

const Main = () => {
    return (
        <>
            <ScrollToTop></ScrollToTop>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Main;