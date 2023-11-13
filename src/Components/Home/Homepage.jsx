import React from 'react';
import Banner from './HomeComponent/Banner';
import TopItem from './HomeComponent/TopItem';
import ChefSays from './HomeComponent/ChefSays';
import HomePageShortMenu from './HomeComponent/HomePageShortMenu';
import HomePageContacts from './HomeComponent/HomePageContacts';
import ChefRecomended from './HomeComponent/ChefRecomended';
import Highlighted from './HomeComponent/Highlighted';
import Reviews from './HomeComponent/Reviews';

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <TopItem></TopItem>
            <ChefSays></ChefSays>
            <HomePageShortMenu></HomePageShortMenu>
            <HomePageContacts></HomePageContacts>
            <ChefRecomended></ChefRecomended>
            <Highlighted></Highlighted>
            <Reviews></Reviews>
        </div>
    );
};

export default Homepage;