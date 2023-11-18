import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Homepage from "../Components/Home/Homepage";
import ErrorPage from "../Components/SharedComponent/ErrorPage";
import MenuPage from "../Components/Menu/MenuPage";
import OrderPage from "../Components/Orderpage/OrderPage";
import Login from "../Components/AuthComponent/Login";
import Contact from "../Components/Contact/Contact";
import Register from "../Components/AuthComponent/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Homepage></Homepage>
            },
            {
                path: "/menu",
                element: <MenuPage></MenuPage>
            },
            {
                path: "/order/:category",
                element: <OrderPage></OrderPage>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    },
]);

export default router;