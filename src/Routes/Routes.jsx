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
import AllUsers from "../Components/AdminDashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import AddAItem from "../Components/AdminDashboard/AddAItem";
import ManageItem from "../Components/AdminDashboard/ManageItem";
import Payment from "../Components/UserDashboard/Payment";
import OrderHistory from "../Components/UserDashboard/OrderHistory";
import HomeAdmin from "../Components/AdminDashboard/HomeAdmin";
import ManageOrder from "../Components/AdminDashboard/ManageOrder";
import ManageBookings from "../Components/AdminDashboard/ManageBookings";
import AddReview from "../Components/UserDashboard/AddReview";
import Reservation from "../Components/UserDashboard/Reservation";
import MyBookings from "../Components/UserDashboard/MyBookings";

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
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard/adminHome',
                element: <AdminRoute><HomeAdmin></HomeAdmin></AdminRoute>
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUsers></AllUsers>
            },
            {
                path: '/dashboard/addItem',
                element: <AdminRoute><AddAItem></AddAItem></AdminRoute>
            },
            {
                path: '/dashboard/manageItems',
                element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
            },
            {
                path: '/dashboard/manageOrders',
                element: <AdminRoute><ManageOrder></ManageOrder></AdminRoute>
            },
            {
                path: '/dashboard/manageBookings',
                element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
            },
            {
                path: "/dashboard/userHome",
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
                path: '/dashboard/reservation',
                element: <PrivateRoute><Reservation></Reservation></PrivateRoute>
            },
            {
                path: '/dashboard/myCart',
                element: <PrivateRoute><CartItem></CartItem></PrivateRoute>
            },
            {
                path: "/dashboard/payment",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: "/dashboard/orders",
                element: <PrivateRoute><OrderHistory></OrderHistory></PrivateRoute>
            },
            {
                path: "/dashboard/addReview",
                element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
            },
            {
                path: '/dashboard/myBookings',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            }
        ]
    }
]);

export default router;