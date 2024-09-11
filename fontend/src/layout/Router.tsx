// import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
// import React from "react";

// import Login from "../pages/login/Login";
// import MainLayout from "./MainLayout";
// import HomePage from "../pages/HomePage/HomePage";
// import OrderPage from "../pages/OrderPage/OrderPage";
// import CustomerManagement from "../pages/Customer/CustomerManagement.tsx";
// import ListOrderPage from "../pages/OrderPage/ListOrderPage.tsx";
// import DetailOrderPage from "../pages/OrderPage/DetailOrderPage.tsx";
// import InvoicePage from "../pages/InvoicePage/InvoicePage.tsx";
// import ListEmployee from "../pages/EmployeePage/ListEmployee.tsx";
// import DetailEmployee from "../pages/EmployeePage/DetailEmployee.tsx";
// import WageHousePage from "../pages/WarehousePage/WageHousePage.tsx";
// import ProductDetail from "../pages/WarehousePage/ProductDetail.tsx";
// import ImportWarehouse from "../pages/WarehousePage/ImportWarehouse.tsx";
// import ExportWarehouse from "../pages/WarehousePage/ExportWarehouse.tsx";
// import LogPage from "../pages/SystemPage/LogPage.tsx";
// import AccountPage from "../pages/SystemPage/AccountPage.tsx";
// import InformartionPage from "../pages/SystemPage/InformationPage.tsx";
// import BackupPage from "../pages/SystemPage/BackupPage.tsx";

// const Login = React.lazy(() => import("../pages/login/Login"));
// const MainLayout = React.lazy(() => import("./MainLayout"));
// const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
// const OrderPage = React.lazy(() => import("../pages/OrderPage/OrderPage"));
// const CustomerManagement = React.lazy(
//   () => import("../pages/Customer/CustomerManagement.tsx")
// );
// const ListOrderPage = React.lazy(
//   () => import("../pages/OrderPage/ListOrderPage.tsx")
// );
// const DetailOrderPage = React.lazy(
//   () => import("../pages/OrderPage/DetailOrderPage.tsx")
// );
// const InvoicePage = React.lazy(
//   () => import("../pages/InvoicePage/InvoicePage.tsx")
// );
// const ListEmployee = React.lazy(
//   () => import("../pages/EmployeePage/ListEmployee.tsx")
// );
// const DetailEmployee = React.lazy(
//   () => import("../pages/EmployeePage/DetailEmployee.tsx")
// );
// const WageHousePage = React.lazy(
//   () => import("../pages/WarehousePage/WageHousePage.tsx")
// );
// const ProductDetail = React.lazy(
//   () => import("../pages/WarehousePage/ProductDetail.tsx")
// );

// const ImportWarehouse = React.lazy(
//   () => import("../pages/WarehousePage/ImportWarehouse.tsx")
// );

// const ExportWarehouse = React.lazy(
//   () => import("../pages/WarehousePage/ExportWarehouse.tsx")
// );
// const LogPage = React.lazy(() => import("../pages/SystemPage/LogPage.tsx"));
// const AccountPage = React.lazy(
//   () => import("../pages/SystemPage/AccountPage.tsx")
// );
// const InformartionPage = React.lazy(
//   () => import("../pages/SystemPage/InformationPage.tsx")
// );
// const BackupPage = React.lazy(
//   () => import("../pages/SystemPage/BackupPage.tsx")
// );

// const appRoutes: RouteObject[] = [
//   {
//     path: "/login",
//     index: true,
//     element: <Login></Login>,
//   },
//   {
//     path: "/",
//     element: <MainLayout></MainLayout>,
//     children: [
//       {
//         index: true,
//         element: <HomePage></HomePage>,
//       },
//       {
//         path: "/customer",
//         element: <CustomerManagement></CustomerManagement>,
//       },
//       {
//         path: "/order/create",
//         element: <OrderPage></OrderPage>,
//       },
//       {
//         path: "/order/list",
//         element: <ListOrderPage></ListOrderPage>,
//       },
//       {
//         path: "/order/detail/:id",
//         element: <DetailOrderPage></DetailOrderPage>,
//       },
//       {
//         path: "/order/invoice",
//         element: <InvoicePage></InvoicePage>,
//       },
//       //Setting router cho đường dẫn tới quản lí nhân viên
//       {
//         path: "/employees/list",
//         element: <ListEmployee></ListEmployee>,
//       },
//       {
//         path: "employees/detail/:id",
//         element: <DetailEmployee></DetailEmployee>,
//       },

//       //Setting router cho đường dẫn kho hàng
//       {
//         path: "warehouse/list",
//         element: <WageHousePage></WageHousePage>,
//       },
//       {
//         path: "/warehouse/product/detail/:1",
//         element: <ProductDetail></ProductDetail>,
//       },
//       {
//         path: "warehouse/import",
//         element: <ImportWarehouse></ImportWarehouse>,
//       },
//       {
//         path: "warehouse/export",
//         element: <ExportWarehouse></ExportWarehouse>,
//       },

//       //URL system page
//       {
//         path: "/system/log",
//         element: <LogPage></LogPage>,
//       },
//       {
//         path: "/system/accounts",
//         element: <AccountPage></AccountPage>,
//       },
//       {
//         path: "/system/information",
//         element: <InformartionPage></InformartionPage>,
//       },

//       { path: "/system/backup", element: <BackupPage></BackupPage> },
//     ],
//   },
// ];

// const router = createBrowserRouter([
//   {
//     element: <Outlet></Outlet>,
//     children: appRoutes,
//   },
// ]);

// export default router;

import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import React, { Suspense } from "react";
import MainLayout from "./MainLayout";
import Spiner from "../component/Spiner/Spiner.tsx";
import Finance from "../pages/Statictis/Finance/Finance.tsx";
import Analyse from "../pages/Statictis/Analyse/Analyse.tsx";

// Sử dụng React.lazy để lazy load các component
const Login = React.lazy(() => import("../pages/login/Login"));
// const MainLayout = React.lazy(() => import("./MainLayout"));
const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
const OrderPage = React.lazy(() => import("../pages/OrderPage/OrderPage"));
const CustomerManagement = React.lazy(
  () => import("../pages/Customer/CustomerManagement.tsx")
);
const CustomerHistoryOrder = React.lazy(
  () => import("../pages/Customer/CustomerHistoryOrder.tsx")
);
const CustomerInfomation = React.lazy(
  () => import("../pages/Customer/CustomerInfomation.tsx")
);
const CustomerCreate = React.lazy(
  () => import("../pages/Customer/CustomerCreate.tsx")
);

const HistoryBackupPage = React.lazy(
  () => import("../pages/SystemPage/BackupPage/HistoryBackupPage.tsx")
);
// const ListOrderPage = React.lazy(
//   () => import("../pages/OrderPage/ListOrderPage.tsx")
// );
// const DetailOrderPage = React.lazy(
//   () => import("../pages/OrderPage/DetailOrderPage.tsx")
// );
// const InvoicePage = React.lazy(
//   () => import("../pages/InvoicePage/InvoicePage.tsx")
// );
// const ListEmployee = React.lazy(
//   () => import("../pages/EmployeePage/ListEmployee.tsx")
// );
// const DetailEmployee = React.lazy(
//   () => import("../pages/EmployeePage/DetailEmployee.tsx")
// );
// const WageHousePage = React.lazy(
//   () => import("../pages/WarehousePage/WageHousePage.tsx")
// );
// const ProductDetail = React.lazy(
//   () => import("../pages/WarehousePage/ProductDetail.tsx")
// );
// const ImportWarehouse = React.lazy(
//   () => import("../pages/WarehousePage/ImportWarehouse.tsx")
// );
// const ExportWarehouse = React.lazy(
//   () => import("../pages/WarehousePage/ExportWarehouse.tsx")
// );
// const LogPage = React.lazy(() => import("../pages/SystemPage/LogPage.tsx"));
// const AccountPage = React.lazy(
//   () => import("../pages/SystemPage/AccountPage.tsx")
// );
// const InformartionPage = React.lazy(
//   () => import("../pages/SystemPage/InformationPage.tsx")
// );
// const BackupPage = React.lazy(
//   () => import("../pages/SystemPage/BackupPage.tsx")

//   // () => import("../pages/Customer/CustomerManagement.tsx")
// );
const ListOrderPage = React.lazy(
  () => import("../pages/OrderPage/ListOrderPage.tsx")
);
const DetailOrderPage = React.lazy(
  () => import("../pages/OrderPage/DetailOrderPage.tsx")
);
const InvoicePage = React.lazy(
  () => import("../pages/InvoicePage/InvoicePage.tsx")
);
const ListEmployee = React.lazy(
  () => import("../pages/EmployeePage/ListEmployee.tsx")
);
const DetailEmployee = React.lazy(
  () => import("../pages/EmployeePage/DetailEmployee.tsx")
);
const WageHousePage = React.lazy(
  () => import("../pages/WarehousePage/WageHousePage.tsx")
);
const ProductDetail = React.lazy(
  () => import("../pages/WarehousePage/ProductDetail.tsx")
);
const ImportWarehouse = React.lazy(
  () => import("../pages/WarehousePage/ImportWarehouse.tsx")
);
const ExportWarehouse = React.lazy(
  () => import("../pages/WarehousePage/ExportWarehouse.tsx")
);
const LogPage = React.lazy(() => import("../pages/SystemPage/LogPage.tsx"));
const AccountPage = React.lazy(
  () => import("../pages/SystemPage/AccountPage.tsx")
);
const InformartionPage = React.lazy(
  () => import("../pages/SystemPage/InformationPage.tsx")
);
const BackupPage = React.lazy(
  () => import("../pages/SystemPage/BackupPage/BackupPage.tsx")
);

const appRoutes: RouteObject[] = [
  {
    path: "/login",
    index: true,
    // Sử dụng Suspense để bao bọc component được lazy load
    element: (
      <Suspense fallback={<Spiner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spiner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/customer",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerManagement />
          </Suspense>
        ),
      },
      {
        path: "/customer/infomation/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerInfomation />
          </Suspense>
        ),
      },
      {
        path: "/customer/historyoder/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerHistoryOrder />
          </Suspense>
        ),
      },
      {
        path: "/customer/create",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerCreate />
          </Suspense>
        ),
      },
      {
        path: "/order/create",
        element: (
          <Suspense fallback={<Spiner />}>
            <OrderPage />
          </Suspense>
        ),
      },
      {
        path: "/order/list",
        element: (
          <Suspense fallback={<Spiner />}>
            <ListOrderPage />
          </Suspense>
        ),
      },
      {
        path: "/order/list/detail/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <DetailOrderPage />
          </Suspense>
        ),
      },
      {
        path: "/order/invoice",
        element: (
          <Suspense fallback={<Spiner />}>
            <InvoicePage />
          </Suspense>
        ),
      },
      {
        path: "/employees/list",
        element: (
          <Suspense fallback={<Spiner />}>
            <ListEmployee />
          </Suspense>
        ),
      },
      {
        path: "employees/list/detail/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <DetailEmployee />
          </Suspense>
        ),
      },

      // URL thống kê
      {
        path: "/statictis/finance",
        element: (
          <Suspense fallback={<Spiner />}>
            <Finance />
          </Suspense>
        ),
      },
      {
        path: "/statictis/analyse",
        element: (
          <Suspense fallback={<Spiner />}>
            <Analyse />
          </Suspense>
        ),
      },

      //URL kho hàng
      {
        path: "warehouse/list",
        element: (
          <Suspense fallback={<Spiner />}>
            <WageHousePage />
          </Suspense>
        ),
      },
      {
        path: "/warehouse/list/product/detail/:1",
        element: (
          <Suspense fallback={<Spiner />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "warehouse/import",
        element: (
          <Suspense fallback={<Spiner />}>
            <ImportWarehouse />
          </Suspense>
        ),
      },
      {
        path: "warehouse/export",
        element: (
          <Suspense fallback={<Spiner />}>
            <ExportWarehouse />
          </Suspense>
        ),
      },

      //URL hệ thống
      {
        path: "/system/log",
        element: (
          <Suspense fallback={<Spiner />}>
            <LogPage />
          </Suspense>
        ),
      },
      {
        path: "/system/accounts",
        element: (
          <Suspense fallback={<Spiner />}>
            <AccountPage />
          </Suspense>
        ),
      },
      {
        path: "/system/information",
        element: (
          <Suspense fallback={<Spiner />}>
            <InformartionPage />
          </Suspense>
        ),
      },
      {
        path: "/system/backup",
        element: (
          <Suspense fallback={<Spiner />}>
            <BackupPage />
          </Suspense>
        ),
      },
      {
        path: "/system/backup/history",
        element: (
          <Suspense fallback={<Spiner />}>
            <HistoryBackupPage />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: appRoutes,
  },
]);

export default router;
