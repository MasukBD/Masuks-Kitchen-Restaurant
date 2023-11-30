import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Homepage from "../Components/Home/Homepage";
import ErrorPage from "../Components/SharedComponent/ErrorPage";
import MenuPage from "../Components/Menu/MenuPage";
import OrderPage from "../Components/Orderpage/OrderPage";
import Login from "../Components/AuthComponent/Login";
import Contact from "../Components/Contact/Contact";
import Register from "../Components/AuthComponent/Register";
import PrivateRoute from "./PrivateRoute";
import CartItem from "../Components/CartPages/CartItem";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Components/UserDashboard/UserHome";

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
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard/",
                element: <UserHome></UserHome>
            },
            {
                path: '/dashboard/myCart',
                element: <PrivateRoute><CartItem></CartItem></PrivateRoute>
            },
        ]
    }
]);

export default router;