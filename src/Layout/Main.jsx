import React from 'react';
import Header from '../Components/SharedComponent/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/SharedComponent/Footer';

const Main = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Main;