import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";
import MainLayout from "./MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import CustomerManagement from "../pages/Customer/CustomerManagement.tsx";
import ListOrderPage from "../pages/OrderPage/ListOrderPage.tsx";
import DetailOrderPage from "../pages/OrderPage/DetailOrderPage.tsx";
import InvoicePage from "../pages/InvoicePage/InvoicePaee";
import ListEmployee from "../pages/EmployeePage/ListEmployee.tsx";
import DetailEmployee from "../pages/EmployeePage/DetailEmployee.tsx";
import WageHousePage from "../pages/WarehousePage/WageHousePage.tsx";
import ProductDetail from "../pages/WarehousePage/ProductDetail.tsx";
import ImportWarehouse from "../pages/WarehousePage/ImportWarehouse.tsx";
import ExportWarehouse from "../pages/WarehousePage/ExportWarehouse.tsx";
import LogPage from "../pages/SystemPage/LogPage.tsx";
import AccountPage from "../pages/SystemPage/AccountPage.tsx";
import InformartionPage from "../pages/SystemPage/InformationPage.tsx";

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

      //Setting router cho đường dẫn kho hàng
      {
        path: "warehouse/list",
        element: <WageHousePage></WageHousePage>,
      },
      {
        path: "/warehouse/product/detail/:1",
        element: <ProductDetail></ProductDetail>,
      },
      {
        path: "warehouse/import",
        element: <ImportWarehouse></ImportWarehouse>,
      },
      {
        path: "warehouse/export",
        element: <ExportWarehouse></ExportWarehouse>,
      },

      //URL system page
      {
        path: "/system/log",
        element: <LogPage></LogPage>,
      },
      {
        path: "/system/accounts",
        element: <AccountPage></AccountPage>,
      },
      {
        path: "/system/information",
        element: <InformartionPage></InformartionPage>,
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
