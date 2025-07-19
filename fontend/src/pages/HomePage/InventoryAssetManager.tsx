import "./InventoryAssetManager.css";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
// import TrendingUpIcon from '@mui/icons-material/BarChartOutlined';
// import ShowChartIcon from '@mui/icons-material/ShowChart';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// import {useEffect,
//     // useState
// } from "react";
// // import DashboardModel from "../../model/dashboard.model";
// import DashboardService from "../../service/DashboardService.tsx";
// import {toast} from "react-toastify";
// import {formatCurrency} from "../../utils/Utils.tsx";
// // import Debt from "../../model/debt.model.tsx";
// import Order from "../../model/order.model.tsx";






    const HomePage = () => {

        // const [dashboard, setDashboard] = useState<DashboardModel>({
        //     customers: [],
        //     orders: [],
        //     debts: [],
        //     aveRevenue: 0,
        //     realRevenue: 0,
        //     debtRevenue: 0,
        //     sumRevenue: 0,
        //     sumOrders: 0,
        // });
// Lấy ngày hiện tại
//         const today = new Date();
//         const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // tháng hiện tại
//         const formattedDate = today.toLocaleDateString(); // ngày hiẹn tại
        // Hàm tính tổng số tiền công nợ
        // const calculateTotalDebtAmount = (debts: Debt[]) => {
        //
        //     return debts.reduce((acc, debt) => acc + debt.totalAmount, 0);
        // };
        // Hàm tính tổng số tiền doanh thu
        // const calculateTotalRevenueAmount = (orders: Order[]) => {
        //     return orders.reduce((acc, order) => {
        //         let totalWithVAT = 0;
        //         if (order.status != "CANCELLED"){
        //             totalWithVAT = order.totalPrice! + (order.totalPrice! * order.vat / 100);
        //         }
        //         return acc + totalWithVAT;
        //     }, 0);
        // };
        // useEffect(() => {
        //     DashboardService.getDashboard()
        //         .then((response) => {
        //             console.log(response);
        //             if (response.status == 200) {
        //                 setDashboard(response.data.data);
        //             }
        //         })
        //         .catch((error) => {
        //             toast.error("Xảy ra lỗi");
        //             console.log(error.response);
        //         });
        // }, []);
        return (


            <div className="container">
                    <h2>Hệ thống đang cập nhật!</h2>

            </div>


        );
    };


export default HomePage;
