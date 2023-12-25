import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionCover from '../SharedComponent/SectionCover';
import banner from '../../assets/images/menu-page/banner.jpg';
import soup from '../../assets/images/menu-page/soup-bg.jpg';
import dessert from '../../assets/images/menu-page/dessert-bg.jpg';
import pizza from '../../assets/images/menu-page/pizza-bg.jpg';
import salad from '../../assets/images/menu-page/salad-bg.jpg';
import drink from '../../assets/images/menu-page/juice-bg.jpg';
import SectionTilte from '../SharedComponent/SectionTilte';
import EachMenuCategory from '../SharedComponent/EachMenuCategory';
import useMenu from '../../Hooks/useMenu';

const MenuPage = () => {
    const [menu, popularItems, offeredItems, drinksItems, saladItems, pizzaItems, soupItems, desertItems, loading] = useMenu();

    if (loading) {
        return <p className="h-screen flex justify-center items-center"><span className='loading loading-spinner w-16 text-warning'></span></p>
    }
    return (
        <>
            <Helmet><title>Menu || Masuk's Kitchen Restaurant</title></Helmet>
            <SectionCover image={banner} heading={'Explore Our Menu'} subHeading={"Masuk's Kitchen is a culinary canvas where flavors dance harmoniously. Their menu is a symphony of diverse ingredients, each dish a masterpiece painted with passion and creativity."}></SectionCover>

            {/* popular items section  */}
            <>
                <SectionTilte heading={"Popular Items"} subheading={"-- Best In Town --"}></SectionTilte>
                <EachMenuCategory category={'popular'} menu={popularItems}></EachMenuCategory>
            </>

            {/* offered items  */}
            <>
                <SectionTilte heading={"Offered Items"} subheading={"-- Taste In Best Price --"}></SectionTilte>
                <EachMenuCategory category={'offered'} menu={offeredItems}></EachMenuCategory>
            </>

            {/* Drinks items  */}
            <div className='my-8'>
                <SectionCover image={drink} heading={"Drinks Items"} subHeading={"Fruit juice is a popular and refreshing beverage made by extracting the liquid from fruits. It comes in various forms, including 100% pure fruit juice and juice blends. While fruit juice can be a convenient way to consume vitamins and minerals found in fruits, it's essential to be mindful of added sugars in some commercial varieties."}></SectionCover>
                <EachMenuCategory category={'drinks'} menu={drinksItems}></EachMenuCategory>
            </div>
            {/* Salad items  */}
            <div className='my-8'>
                <SectionCover image={salad} heading={"Salad Items"} subHeading={"One of the advantages of salad mixes is the ease of preparation; you can simply open the bag, rinse the contents, and toss together a fresh salad in a matter of minutes. However, it's important to be aware of expiration dates and storage recommendations to ensure the freshness and safety of the greens."}></SectionCover>
                <EachMenuCategory category={'salad'} menu={saladItems}></EachMenuCategory>
            </div>
            {/* Soup items  */}
            <div className='my-8'>
                <SectionCover image={soup} heading={"Soup Items"} subHeading={"Soup is a versatile and comforting dish that typically consists of a liquid base, vegetables, and often includes meats, grains, or legumes. It comes in various flavors and textures, ranging from hearty stews to light broths."}></SectionCover>
                <EachMenuCategory category={'soup'} menu={soupItems}></EachMenuCategory>
            </div>
            {/* Pizza items  */}
            <div className='my-8'>
                <SectionCover image={pizza} heading={"Pizza Items"} subHeading={"Pizza is a beloved and globally enjoyed dish originating from Italy. It typically features a thin, round crust topped with tomato sauce, cheese, and various ingredients like meats, vegetables, and herbs."}></SectionCover>
                <EachMenuCategory category={'pizza'} menu={pizzaItems}></EachMenuCategory>
            </div>
            {/* Dessert items  */}
            <div className='my-8'>
                <SectionCover image={dessert} heading={"Dessert Items"} subHeading={"Sweet desserts are indulgent treats enjoyed after meals or as standalone delights. Ranging from cakes, pies, and cookies to ice cream and pastries, desserts satisfy the craving for sweetness."}></SectionCover>
                <EachMenuCategory category={'dessert'} menu={desertItems}></EachMenuCategory>
            </div>
        </>
    );
};

export default MenuPage;