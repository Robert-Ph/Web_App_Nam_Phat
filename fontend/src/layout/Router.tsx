import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";
import MainLayout from "./MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import CustomerManagement from "../pages/Customer/CustomerManagement.tsx";
import ListOrderPage from "../pages/ListOrderPage/ListOrderPage";
import DetailOrderPage from "../pages/DetailOrderPage/DetailOrderPage";
import InvoicePage from "../pages/InvoicePage/InvoicePaee";
import ListEmployee from "../pages/EmployeePage/ListEmployee.tsx";
import DetailEmployee from "../pages/EmployeePage/DetailEmployee.tsx";

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
        element: <CustomerManagement></CustomerManagement>,
      },
      {
        path: "/order/create",
        element: <OrderPage></OrderPage>,
      },
      {
        path: "/order/list",
        element: <ListOrderPage></ListOrderPage>,
      },
      {
        path: "/order/detail/:id",
        element: <DetailOrderPage></DetailOrderPage>,
      },
      {
        path: "/order/invoice",
        element: <InvoicePage></InvoicePage>,
      },
      //Setting router cho đường dẫn tới quản lí nhân viên
      {
        path: "/employees/list",
        element: <ListEmployee></ListEmployee>,
      },
      {
        path: "employees/detail/:id",
        element: <DetailEmployee></DetailEmployee>,
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
