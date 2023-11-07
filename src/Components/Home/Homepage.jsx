import React from 'react';
import Banner from './HomeComponent/Banner';
import TopItem from './HomeComponent/TopItem';
import ChefSays from './HomeComponent/ChefSays';

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <TopItem></TopItem>
            <ChefSays></ChefSays>
        </div>
    );
};

export default Homepage;