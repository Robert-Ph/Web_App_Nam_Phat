import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import React, { Suspense } from "react";
import MainLayout from "./MainLayout";
import Spiner from "../component/Spiner/Spiner.tsx";
import Finance from "../pages/Statictis/Finance/Finance.tsx";
import Analyse from "../pages/Statictis/Analyse/Analyse.tsx";
import HistoryImportWageHouse from "../pages/WarehousePage/HistoryImportWageHouse.tsx";
import DetailImportWageHouse from "../pages/WarehousePage/DetailImportWageHouse.tsx";
import RequireAuth from "../contexts/RequireAuth.tsx";
import NotFound from "../pages/404/NotFound.tsx";
import ListWorkPage from "../pages/Work/ListWork/ListWorkPage.tsx";
import DetailWorkPage from "../pages/Work/ListWork/DetailWorkPage.tsx";
import PriceCalculation from "../pages/Work/Tinhgia/PriceCalculation.tsx";
import CustomPriceCal from "../pages/Work/Tinhgia/CustomPriceCal.tsx";

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
    path: "*",
    element: (
      <Suspense fallback={<Spiner />}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <RequireAuth allowedRoles={["ADMIN", "USER"]}>
        <MainLayout />
      </RequireAuth>
    ),
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
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <CustomerManagement />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/customer/list/infomation/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <CustomerInfomation />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/customer/list/historyoder/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <CustomerHistoryOrder />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/customer/list/create",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <CustomerCreate />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/customer/debt/list",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <CustomerDebt />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/customer/debt/list/detail/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <DetailDebt />
            </Suspense>
          </RequireAuth>
        ),
      },

      {
        path: "/customer/debt/list/order/detail/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <DetailOrderPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/customer/list/historyoder/order/detail/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <DetailOrderPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/order/create",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <OrderPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/order/list",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <ListOrderPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/order/list/detail/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <DetailOrderPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/order/invoice",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <InvoicePage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/employees/list",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <ListEmployee />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "employees/list/detail/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <DetailEmployee />
            </Suspense>
          </RequireAuth>
        ),
      },

      // URL thống kê
      {
        path: "/statictis/finance",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <Finance />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/statictis/analyse",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <Analyse />
            </Suspense>
          </RequireAuth>
        ),
      },

      //URL kho hàng
      {
        path: "warehouse/list",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <WageHousePage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/warehouse/list/product/detail/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <ProductDetail />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "warehouse/import",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <ImportWarehouse />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "warehouse/list/history",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <HistoryImportWageHouse />
            </Suspense>
          </RequireAuth>
        ),
      },

      {
        path: "warehouse/list/history/detail/:id",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <DetailImportWageHouse />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "warehouse/export",
        element: (
          <RequireAuth allowedRoles={["ADMIN", "USER"]}>
            <Suspense fallback={<Spiner />}>
              <ExportWarehouse />
            </Suspense>
          </RequireAuth>
        ),
      },

      //URL hệ thống
      {
        path: "/system/log",
        element: (
          <RequireAuth allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Spiner />}>
              <LogPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/system/accounts",
        element: (
          <RequireAuth allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Spiner />}>
              <AccountPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/system/information",
        element: (
          <RequireAuth allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Spiner />}>
              <InformartionPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/system/backup",
        element: (
          <RequireAuth allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Spiner />}>
              <BackupPage />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/system/backup/history",
        element: (
          <RequireAuth allowedRoles={["ADMIN"]}>
            <Suspense fallback={<Spiner />}>
              <HistoryBackupPage />
            </Suspense>
          </RequireAuth>
        ),
      },

        // Url work, tool
        {
            path: "/work/list-work",
            element: (
                <RequireAuth allowedRoles={["ADMIN", "USER"]}>
                    <Suspense fallback={<Spiner/>}>
                        <ListWorkPage/>
                    </Suspense>
                </RequireAuth>
            )
        },
        {
            path: "/work/list-work/detail/:id",
            element: (
                <RequireAuth allowedRoles={["ADMIN", "USER"]}>
                    <Suspense fallback={<Spiner/>}>
                        <DetailWorkPage/>
                    </Suspense>
                </RequireAuth>
            )
        },
        {
            path: "/work/price_calculation",
            element: (
                <RequireAuth allowedRoles={["ADMIN", "USER"]}>
                    <Suspense fallback={<Spiner/>}>
                        <PriceCalculation/>
                    </Suspense>
                </RequireAuth>
            )
        },
        {
            path: "/work/price_calculation/custom_price",
            element: (
                <RequireAuth allowedRoles={["ADMIN", "USER"]}>
                    <Suspense fallback={<Spiner/>}>
                        <CustomPriceCal/>
                    </Suspense>
                </RequireAuth>
            )
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
