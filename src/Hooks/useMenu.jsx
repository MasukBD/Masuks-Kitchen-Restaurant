import { useEffect, useState } from "react";

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/menu.json')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setMenu(data);
            });
    }, []);
    return [menu, loading]
};

export default useMenu;