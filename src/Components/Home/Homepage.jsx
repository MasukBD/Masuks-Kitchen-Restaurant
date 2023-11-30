import React from 'react';
import Banner from './HomeComponent/Banner';
import TopItem from './HomeComponent/TopItem';
import ChefSays from './HomeComponent/ChefSays';
import HomePageShortMenu from './HomeComponent/HomePageShortMenu';
import HomePageContacts from './HomeComponent/HomePageContacts';
import ChefRecomended from './HomeComponent/ChefRecomended';
import Highlighted from './HomeComponent/Highlighted';
import Reviews from './HomeComponent/Reviews';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../Hooks/UseMenu';

const Homepage = () => {
    const [, , , , , , , , loading] = useMenu();
    if (loading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 md:w-24 text-warning'></span></p>
    }
    return (
        <>
            <Helmet><title>Home || Masuk's Kitchen Restaurant</title></Helmet>
            <Banner></Banner>
            <TopItem></TopItem>
            <ChefSays></ChefSays>
            <HomePageShortMenu></HomePageShortMenu>
            <HomePageContacts></HomePageContacts>
            <ChefRecomended></ChefRecomended>
            <Highlighted></Highlighted>
            <Reviews></Reviews>
        </>
    );
};

export default Homepage;