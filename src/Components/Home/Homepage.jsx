import React from 'react';
import Banner from './HomeComponent/Banner';
import TopItem from './HomeComponent/TopItem';
import ChefSays from './HomeComponent/ChefSays';
import HomePageShortMenu from './HomeComponent/HomePageShortMenu';
import HomePageContacts from './HomeComponent/HomePageContacts';

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <TopItem></TopItem>
            <ChefSays></ChefSays>
            <HomePageShortMenu></HomePageShortMenu>
            <HomePageContacts></HomePageContacts>
        </div>
    );
};

export default Homepage;