import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";
import MainLayout from "./MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import CustomerManagement from "../pages/Customer/CustomerManagement.tsx";

const appRoutes: RouteObject[] = [
  {
    path: "/login",
    index: true,
    element: <Login></Login>,
  },
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "/customer",
        element: <CustomerManagement></CustomerManagement>
      },
      {
        path: "/order",
        element: <OrderPage></OrderPage>,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    element: <Outlet></Outlet>,
    children: appRoutes,
  },
]);

export default router;
