import "./BusinessFinanceManager.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import TrendingUpIcon from '@mui/icons-material/BarChartOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import {useEffect, useState} from "react";
import DashboardModel from "../../model/dashboard.model";
import DashboardService from "../../service/DashboardService.tsx";
import {toast} from "react-toastify";
import {formatCurrency} from "../../utils/Utils.tsx";
// import Debt from "../../model/debt.model.tsx";
import Order from "../../model/order.model.tsx";






    const HomePage = () => {

        const [dashboard, setDashboard] = useState<DashboardModel>({
            customers: [],
            orders: [],
            debts: [],
            aveRevenue: 0,
            realRevenue: 0,
            debtRevenue: 0,
            sumRevenue: 0,
            sumOrders: 0,
        });
// Lấy ngày hiện tại
        const today = new Date();
        const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // tháng hiện tại
        const formattedDate = today.toLocaleDateString(); // ngày hiẹn tại
        // Hàm tính tổng số tiền công nợ
        // const calculateTotalDebtAmount = (debts: Debt[]) => {
        //
        //     return debts.reduce((acc, debt) => acc + debt.totalAmount, 0);
        // };
        // Hàm tính tổng số tiền doanh thu
        const calculateTotalRevenueAmount = (orders: Order[]) => {
            return orders.reduce((acc, order) => {
                let totalWithVAT = 0;
                if (order.status != "CANCELLED"){
                    totalWithVAT = order.totalPrice! + (order.totalPrice! * order.vat / 100);
                }
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
                {/*//dòng 1*/}
                <div className="hearder-1" style={{marginBottom:"50px"}}>
                    <div className="box" style={{background: "var(--color-doanhthu)" }}>
                        <div className="icon">
                            <TrendingUpIcon className="icon-size" style={{ color: "var(--text-doanhthu)"}}></TrendingUpIcon>
                        </div>
                        <div className="icon textbox font-size-16" style={{color:"var(--text-doanhthu)"}}>
                            <p style={{fontSize:'20px'}}>Doanh thu/năm</p>
                            <p>{formatCurrency(calculateTotalRevenueAmount(dashboard.orders))} vnđ</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-chitieu)" }}>
                        <div className="icon">
                            <CandlestickChartIcon className="icon-size" style={{ color: "var(--text-chitieu)"}}></CandlestickChartIcon>
                        </div>
                        <div className="icon textbox" style={{ color: "var(--text-chitieu)"}}>
                            <p style={{fontSize:'20px'}}>Chi tiêu/năm</p>
                            <p>0 vnđ</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-tangtruong)" }}>
                        <div className="icon">
                            <ShowChartIcon className="icon-size" style={{ color: "var(--text-tangtruong)"}}></ShowChartIcon>
                        </div>
                        <div className="icon textbox" style={{ color: "var(--text-tangtruong)"}}>
                            <p style={{fontSize:'20px'}}>Tăng trưởng doanh thu</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-nopay)" }}>
                        <div className="icon">
                            <ReceiptIcon className="icon-size" style={{ color: "var(--text-nopay)"}}></ReceiptIcon>
                        </div>
                        <div className="icon textbox" style={{ color: "var(--text-nopay)"}}>
                            <p style={{fontSize:'20px'}}>HĐ chưa thanh toán</p>
                            <p>{dashboard.customers.length}</p>
                        </div>
                    </div>

                </div>
                <br/>
                {/*//dong 2*/}
                <div className="hearder-2" style={{paddingTop:"20px"}}>
                    <div className="box" style={{background: "var(--color-order)" }}>
                        <div className="icon">
                            <ShoppingCartOutlinedIcon className="icon-size" style={{ color: "var(--text-order)"}}></ShoppingCartOutlinedIcon>
                        </div>
                        <div className="icon textbox font-size-16" style={{color:"var(--text-order)"}}>
                            <p style={{fontSize:'20px'}}>Đơn hàng/năm</p>
                            <p>{dashboard.orders.length}</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-noorder)"}}>
                        <div className="icon">
                            <Inventory2Icon className="icon-size" style={{color:"var(--text-noorder)"}}></Inventory2Icon>
                        </div>
                        <div className="icon textbox" style={{color:"var(--text-noorder)"}}>
                            <p style={{fontSize:'20px'}}>Đơn chưa hoàn thành</p>
                            <p>{dashboard.orders.length}</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-newuser)"}}>
                        <div className="icon">
                            <GroupAddIcon className="icon-size" style={{color:"var(--text-newuser)"}}></GroupAddIcon>
                        </div>
                        <div className="icon textbox" style={{color:"var(--text-newuser)"}}>
                            <p style={{fontSize:'20px'}}>Khách hàng mới</p>
                            <p>{dashboard.customers.length}</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-active"}}>
                        <div className="icon">
                            <PersonOutlineIcon className="icon-size" style={{color:"var(--text-active)"}}></PersonOutlineIcon>
                        </div>
                        <div className="icon textbox" style={{color:"var(--text-active)"}}>
                            <p style={{fontSize:'20px'}}>Đang hoạt động</p>
                            <p>0 vnđ</p>
                        </div>
                    </div>
                </div>



                <div className="body">
                    {/*hoat dong theo thang*/}
                    <div className="body_1" style={{background: "#F0F9FF"}}>
                        <div className="div">
                            <p className="text" style={{fontWeight: "bold", color:"#0F172A"}}>Hoạt động</p>
                            <p className="text" style={{color:"#0F172A"}}>Tháng {currentMonth}</p>
                        </div>
                        <div className="div-body" style={{background: "#F0F9FF"}}>
                            <table className="table-home" style={{color:"#0F172A"}}>
                                <tbody>
                                <tr>
                                    <td>Tổng doanh thu:</td>
                                    <td>{formatCurrency(dashboard.sumRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng đơn hàng:</td>
                                    <td>{dashboard.sumOrders}</td>

                                </tr>
                                <tr>
                                    <td>Giá Trị TB/đơn hàng:</td>
                                    <td>{formatCurrency(dashboard.aveRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng chi:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Lợi Nhuận Gộp:</td>
                                    <td>{formatCurrency(dashboard.realRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng công nợ:</td>
                                    <td>{formatCurrency(dashboard.debtRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    {/*don hang theo thang*/}
                    <div className="body_1" style={{background: "#ECFDF5"}}>
                        <div className="div" >
                            <p className="text" style={{fontWeight: "bold", color:"#065F46"}}>Đơn hàng</p>
                            <p className="text" style={{ color:"#065F46"}}>Tháng {currentMonth}</p>
                        </div>
                        <div className="div-body" style={{background: "#ECFDF5",}}>
                            <table className="table-home" style={{ color:"#065F46"}}>
                                <tbody>
                                <tr>
                                    <td>Tổng đơn hàng:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đơn Đã Giao:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đang xử lý:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đơn Chờ Giao:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đơn Mới Nhận:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đơn bị hủy/lỗi:</td>
                                    <td>0</td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/*hoat dong theo ngay*/}
                    <div className="body_1" style={{background: "#F0F9FF"}}>
                        <div className="div">
                            <p className="text" style={{fontWeight: "bold", color:"#0F172A"}}>Hoạt động</p>
                            <p className="text" style={{color:"#0F172A"}}>{formattedDate}</p>
                        </div>
                        <div className="div-body" style={{background: "#F0F9FF"}}>
                            <table className="table-home" style={{color:"#0F172A"}}>
                                <tbody>
                                <tr>
                                    <td>Tổng doanh thu:</td>
                                    <td>{formatCurrency(dashboard.sumRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng đơn hàng:</td>
                                    <td>{dashboard.sumOrders}</td>

                                </tr>
                                <tr>
                                    <td>Giá Trị TB/đơn hàng:</td>
                                    <td>{formatCurrency(dashboard.aveRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng chi:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Lợi Nhuận Gộp:</td>
                                    <td>{formatCurrency(dashboard.realRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng công nợ:</td>
                                    <td>{formatCurrency(dashboard.debtRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    {/*don hang theo ngay*/}
                    <div className="body_1" style={{background: "#ECFDF5"}}>
                        <div className="div">
                            <p className="text" style={{fontWeight: "bold", color:"#065F46"}}>Đơn hàng</p>
                            <p className="text" style={{ color:"#065F46"}}>{formattedDate}</p>
                        </div>
                        <div className="div-body" style={{background: "#ECFDF5"}}>
                            <table className="table-home" style={{ color:"#065F46"}}>
                                <tbody>
                                <tr>
                                    <td>Tổng đơn hàng:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đơn Đã Giao:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đang xử lý:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đơn Chờ Giao:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đơn Mới Nhận:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Đơn bị hủy/lỗi:</td>
                                    <td>0</td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>





                {/*chi tieu*/}
                <div className="body">
                    {/*chi tieu theo tháng*/}
                    <div className="body_2">
                        <div className="div">
                            <p className="text">Chi tiêu</p>
                            <p className="text">Tháng {currentMonth}</p>
                        </div>
                        <div className="div-body" style={{background:"#FEF2F2"}}>
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

                    {/*chi tieu theo ngày*/}
                    <div className="body_2">
                        <div className="div">
                            <p className="text">Chi tiêu</p>
                            <p className="text">Tháng {currentMonth}</p>
                        </div>
                        <div className="div-body" style={{background:"#FEF2F2"}}>
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


                {/*div 3*/}
                <div className="body" style={{height: "300px"}}>
                    {/*hoat dong theo thang*/}
                    <div className="body_3" >
                        <div className="" style={{marginLeft:"30px"}}>
                            <p className="text" style={{fontWeight: "bold", color:"#92400E"}}>Công Nợ Khách Hàng</p>

                        </div>
                        <div className="div-body" style={{background:"#FFF7ED"}}>
                            <table className="table-home" style={{color:"#92400E"}}>
                                <tbody>
                                <tr>
                                    <td>Tổng Công Nợ :</td>
                                    <td>{formatCurrency(dashboard.sumRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng Số Khách Hàng:</td>
                                    <td>{dashboard.sumOrders}</td>

                                </tr>
                                <tr>
                                    <td>Khách Còn Nợ:</td>
                                    <td>{formatCurrency(dashboard.aveRevenue)}</td>
                                </tr>
                                <tr>
                                    <td>Khách Đã Tất Toán:</td>
                                    <td>0</td>

                                </tr>
                                <tr>
                                    <td>Nợ Quá Hạn:</td>
                                    <td>{formatCurrency(dashboard.realRevenue)}</td>
                                    <td>vnđ</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>
                    {/*don hang theo thang*/}
                    <div className="body_3" style={{background:"#F3F9F6"}}>
                        <div className="" style={{marginLeft:"30px", color:"#1B5E20", fontWeight:"bold"}}>
                            <p className="text">Lợi Nhuận</p>
                        </div>
                        <div className="div-body" style={{background:"#F3F9F6"}}>
                            <table className="table-home">
                                <tbody>
                                <tr>
                                    <td>Doanh Thu:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tổng Chi Phí:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Lợi Nhuận Gộp:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>ĐLợi Nhuận/Đơn:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Lợi Nhuận Tháng Trước:</td>
                                    <td>0</td>
                                    <td>vnđ</td>
                                </tr>
                                <tr>
                                    <td>Tăng Trưởng Tháng:</td>
                                    <td>0</td>
                                    <td>%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>


        );
    };


export default HomePage;
