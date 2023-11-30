import React, { useState } from 'react';
import SectionCover from '../SharedComponent/SectionCover';
import orderImage from '../../assets/images/order-page/order.jpg';
import { Helmet } from 'react-helmet-async';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/UseMenu';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';

const OrderPage = () => {
    const categories = ['popular', 'offered', 'drinks', 'salad', 'soup', 'pizza', 'dessert'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu, popularItems, offeredItems, drinksItems, saladItems, pizzaItems, soupItems, desertItems, loading] = useMenu();

    if (loading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 md:w-32 text-warning'></span></p>
    }
    return (
        <>
            <Helmet><title>Order || Masuk's Kitchen Restaurant</title></Helmet>
            <SectionCover image={orderImage} heading={"Order Food"} subHeading={"Browse the menu, add items to your cart, and complete the order with your preferred payment method for a seamless online food ordering experience."}></SectionCover>
            <div className='my-10 md:w-11/12 mx-auto p-2 text-center font-semibold'>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className='uppercase'>
                        <Tab>Popular Items</Tab>
                        <Tab>Offered Items</Tab>
                        <Tab>Drinks</Tab>
                        <Tab>Salads</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Desserts</Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={popularItems}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={offeredItems}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinksItems}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={saladItems}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soupItems}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizzaItems}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={desertItems}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
};

export default OrderPage;