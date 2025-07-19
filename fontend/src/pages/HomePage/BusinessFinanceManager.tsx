import "./BusinessFinanceManager.css";

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
//         const today = new Date();
        // const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // tháng hiện tại
        // const formattedDate = today.toLocaleDateString(); // ngày hiẹn tại
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
                <h3>Kinh Doanh</h3>
                {/*//dòng 1*/}
                <div className="hearder-1" style={{marginBottom:"50px"}}>
                    <div className="box" style={{background: "var(--color-doanhthu)" }}>
                        <div className="icon textbox font-size-16" style={{color:"var(--text-doanhthu)"}}>
                            <p style={{fontSize:'16px'}}>Doanh thu/năm</p>
                            <p>{formatCurrency(calculateTotalRevenueAmount(dashboard.orders))} vnđ</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-chitieu)" }}>
                        <div className="icon textbox" style={{ color: "var(--text-chitieu)"}}>
                            <p style={{fontSize:'16px'}}>Chi tiêu/năm</p>
                            <p>0 vnđ</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-tangtruong)" }}>
                        <div className="icon textbox" style={{ color: "var(--text-tangtruong)"}}>
                            <p style={{fontSize:'16px'}}>Tăng trưởng doanh thu</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-nopay)" }}>
                        <div className="icon textbox" style={{ color: "var(--text-nopay)"}}>
                            <p style={{fontSize:'16px'}}>HĐ chưa thanh toán</p>
                            <p>{dashboard.customers.length}</p>
                        </div>
                    </div>

                </div>
                <br/>
                {/*//dong 2*/}
                <div className="hearder-2" style={{paddingTop:"20px", marginBottom:"50px"}}>
                    <div className="box" style={{background: "var(--color-order)" }}>
                        <div className="icon textbox font-size-16" style={{color:"var(--text-order)"}}>
                            <p style={{fontSize:'16px'}}>Đơn hàng/năm</p>
                            <p>{dashboard.orders.length}</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-noorder)"}}>
                        <div className="icon textbox" style={{color:"var(--text-noorder)"}}>
                            <p style={{fontSize:'16px'}}>Đơn chưa hoàn thành</p>
                            <p>{dashboard.orders.length}</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-newuser)"}}>
                        <div className="icon textbox" style={{color:"var(--text-newuser)"}}>
                            <p style={{fontSize:'16px'}}>Khách hàng mới</p>
                            <p>{dashboard.customers.length}</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-active"}}>
                        <div className="icon textbox" style={{color:"var(--text-active)"}}>
                            <p style={{fontSize:'16px'}}>Đang hoạt động</p>
                            <p>0 vnđ</p>
                        </div>
                    </div>
                </div>


                <h3 style={{marginTop:"100px"}}>Tài chính</h3>
                <div className="hearder-1" style={{marginBottom:"50px"}}>
                    <div className="box" style={{background: "var(--color-doanhthu)" }}>
                        <div className="icon textbox font-size-16" style={{color:"var(--text-doanhthu)"}}>
                            <p style={{fontSize:'16px'}}>Tổng Doanh Thu Kỳ(vnđ)</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-chitieu)" }}>
                        <div className="icon textbox" style={{ color: "var(--text-chitieu)"}}>
                            <p style={{fontSize:'16px'}}>Tổng Chi Phí(vnđ)</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-tangtruong)" }}>
                        <div className="icon textbox" style={{ color: "var(--text-tangtruong)"}}>
                            <p style={{fontSize:'16px'}}>Lợi Nhuận Gộp</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="box" style={{background: "var(--color-nopay)" }}>
                        <div className="icon textbox" style={{ color: "var(--text-nopay)"}}>
                            <p style={{fontSize:'16px'}}>Tỷ Suất Lợi Nhuận</p>
                            <p>0%</p>
                        </div>
                    </div>

                </div>

            </div>


        );
    };


export default HomePage;
