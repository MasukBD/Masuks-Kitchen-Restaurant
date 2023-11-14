import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Homepage from "../Components/Home/Homepage";
import ErrorPage from "../Components/SharedComponent/ErrorPage";
import MenuPage from "../Components/Menu/MenuPage";

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
            }
        ]
    },
]);

export default router;