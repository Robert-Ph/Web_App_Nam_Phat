import "./homepage.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {useEffect, useState} from "react";
import DashboardModel from "../../model/dashboard.model";
import DashboardService from "../../service/DashboardService.tsx";
import {toast} from "react-toastify";
import {formatCurrency} from "../../utils/Utils.tsx";
import Debt from "../../model/debt.model.tsx";
import Order from "../../model/order.model.tsx";





    const HomePage = () => {

        const [dashboard, setDashboard] = useState<DashboardModel>({
            customers: [],
            orders: [],
            debts: [],
        });
// Lấy ngày hiện tại
        const today = new Date();
        const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // tháng hiện tại
        const formattedDate = today.toLocaleDateString(); // ngày hiẹn tại
        // Hàm tính tổng số tiền công nợ
        const calculateTotalDebtAmount = (debts: Debt[]) => {
            return debts.reduce((acc, debt) => acc + debt.totalAmount, 0);
        };
        // Hàm tính tổng số tiền doanh thu
        const calculateTotalRevenueAmount = (orders: Order[]) => {
            return orders.reduce((acc, order) => {
                const totalWithVAT = order.totalPrice + (order.totalPrice * order.vat / 100);
                return acc + totalWithVAT;
            }, 0);
        };
        useEffect(() => {
            DashboardService.getDashboard()
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        setDashboard(response.data.data);
                    }
                })
                .catch((error) => {
                    toast.error("Xảy ra lỗi");
                    console.log(error.response);
                });
        }, []);
        return (


            <div className="container">
                <div className="hearder">
                    <div className="box">
                        <div className="icon">
                            <TrendingUpIcon className="icon-size"></TrendingUpIcon>
                        </div>
                        <div className="icon textbox">
                            <p>Doanh thu</p>
                            <p>{formatCurrency(calculateTotalRevenueAmount(dashboard.orders))} vnđ</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <ShoppingCartOutlinedIcon className="icon-size"></ShoppingCartOutlinedIcon>
                        </div>
                        <div className="icon textbox">
                            <p>Đơn hàng</p>
                            <p>{dashboard.orders.length}</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <GroupAddIcon className="icon-size"></GroupAddIcon>
                        </div>
                        <div className="icon textbox">
                            <p>Khách hàng</p>
                            <p>{dashboard.customers.length}</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <CandlestickChartIcon className="icon-size"></CandlestickChartIcon>
                        </div>
                        <div className="icon textbox">
                            <p>Chi tiêu</p>
                            <p>0 vnđ</p>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div className="div">
                        <p className="text">Hoạt động</p>
                        <p className="text" >Tháng {currentMonth}</p>
                    </div>
                    <div className="div-body">
                        <table className="table-home">
                            <tbody>
                            <tr>
                                <td>Tổng doanh thu:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Tổng đơn hàng:</td>
                                <td>0</td>

                            </tr>
                            <tr>
                                <td>Doanh thu/ Đơn hàng:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Tổng chi:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Tổng thu thực:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Tổng công nợ:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="body">
                    <div className="div">
                        <p className="text">Đơn hàng</p>
                        <p className="text">Ngày {formattedDate}</p>
                    </div>
                    <div className="div-body">
                        <table className="table-home">
                            <tbody>
                            <tr>
                                <td>Tổng đơn hàng:</td>
                                <td>0</td>

                            </tr>
                            <tr>
                                <td>Tổng giá trị:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Đơn hàng đã giao:</td>
                                <td>0</td>

                            </tr>
                            <tr>
                                <td>Đơn hàng chưa hoàn thành:</td>
                                <td>0</td>

                            </tr>
                            <tr>
                                <td>Đã thanh toán:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Còn nợ:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="body ">

                    <div className="main">
                        <div className="div div-1">
                            <p className="text">Công nợ khách hàng</p>
                        </div>
                        <div className="div-body-1">
                            <table className="table-home">
                                <tbody>
                                <tr>
                                    <td>Tổng công nợ:</td>
                                    <td>{formatCurrency(calculateTotalDebtAmount(dashboard.debts))}</td>
                                    <td >vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng số khách hàng:</td>
                                    <td>{dashboard.debts.length}</td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="main">
                        <div className="div div-1">
                            <p className="text">Lợi nhuận</p>
                        </div>
                        <div className="div-body-1">
                            <table className="table-home">
                                <tbody>
                                <tr>
                                    <td>Tổng lợi nhuận tháng:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng lợi nhuận:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div className="div">
                        <p className="text">Chi tiêu</p>
                    </div>
                    <div className="div-body">
                        <table className="table-home">
                            <tbody>
                            <tr>
                                <td>Tổng chi:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Tổng đơn mua:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Đã thanh toán:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Còn nợ:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Luong nhân viên:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            <tr>
                                <td>Chi tiêu khác:</td>
                                <td>0</td>
                                <td>vnđ</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        );
    };


export default HomePage;
