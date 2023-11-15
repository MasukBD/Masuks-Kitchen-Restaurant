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
    const [menu, loading] = useMenu();
    const popularItems = menu.filter(item => item.category === 'popular');
    const offeredItems = menu.filter(item => item.category === 'offered');
    const drinksItems = menu.filter(item => item.category === 'drinks');
    const saladItems = menu.filter(item => item.category === 'salad');
    const pizzaItems = menu.filter(item => item.category === 'pizza');
    const soupItems = menu.filter(item => item.category === 'soup');
    const desertItems = menu.filter(item => item.category === 'dessert');

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