import { useEffect, useState } from "react";

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setMenu(data);
            });
    }, []);
    const popularItems = menu.filter(item => item.category === 'popular');
    const offeredItems = menu.filter(item => item.category === 'offered');
    const drinksItems = menu.filter(item => item.category === 'drinks');
    const saladItems = menu.filter(item => item.category === 'salad');
    const pizzaItems = menu.filter(item => item.category === 'pizza');
    const soupItems = menu.filter(item => item.category === 'soup');
    const desertItems = menu.filter(item => item.category === 'dessert');

    return [menu, popularItems, offeredItems, drinksItems, saladItems, pizzaItems, soupItems, desertItems, loading];
};

export default useMenu;