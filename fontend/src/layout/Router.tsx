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
const OrderPage = React.lazy(
  () => import("../pages/OrderPage/OrderPage/OrderPage.tsx")
);
const CustomerManagement = React.lazy(
  () => import("../pages/Customer/CustomerManagement/CustomerManagement.tsx")
);
const CustomerHistoryOrder = React.lazy(
  () =>
    import("../pages/Customer/CustomerHistoryOrder/CustomerHistoryOrder.tsx")
);
const CustomerInfomation = React.lazy(
  () => import("../pages/Customer/CustomerInformation/CustomerInfomation.tsx")
);
const CustomerCreate = React.lazy(
  () => import("../pages/Customer/CustomerCreate/CustomerCreate.tsx")
);
const CustomerDebt = React.lazy(
  () => import("../pages/Customer/Debt/ListDebtCustomer/ListDebtCustomer.tsx")
);

const HistoryBackupPage = React.lazy(
  () => import("../pages/SystemPage/BackupPage/HistoryBackupPage.tsx")
);
const DetailDebt = React.lazy(
  () => import("../pages/Customer/Debt/DetailDebt/DetailDebt.tsx")
);

const ListOrderPage = React.lazy(
  () => import("../pages/OrderPage/ListOrderPage/ListOrderPage.tsx")
);
const DetailOrderPage = React.lazy(
  () => import("../pages/OrderPage/DetailOrderPage/DetailOrderPage.tsx")
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
const LogPage = React.lazy(
  () => import("../pages/SystemPage/LogPage/LogPage.tsx")
);
const AccountPage = React.lazy(
  () => import("../pages/SystemPage/AccountPage/AccountPage.tsx")
);
const InformartionPage = React.lazy(
  () => import("../pages/SystemPage/InformationPage/InformationPage.tsx")
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
        path: "/customer/list",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerManagement />
          </Suspense>
        ),
      },
      {
        path: "/customer/list/infomation/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerInfomation />
          </Suspense>
        ),
      },
      {
        path: "/customer/list/historyoder/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerHistoryOrder />
          </Suspense>
        ),
      },
      {
        path: "/customer/list/create",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerCreate />
          </Suspense>
        ),
      },
      {
        path: "/customer/debt/list",
        element: (
          <Suspense fallback={<Spiner />}>
            <CustomerDebt />
          </Suspense>
        ),
      },
      {
        path: "/customer/debt/list/detail/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <DetailDebt />
          </Suspense>
        ),
      },

      {
        path: "/customer/debt/list/order/detail/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <DetailOrderPage />
          </Suspense>
        ),
      },
      {
        path: "/customer/list/historyoder/order/detail/:id",
        element: (
          <Suspense fallback={<Spiner />}>
            <DetailOrderPage />
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
